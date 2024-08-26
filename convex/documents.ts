import {
  action,
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { v } from "convex/values";
import { createChat } from "./chats";
import { api, internal } from "../convex/_generated/api";
import { Doc } from "./_generated/dataModel";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getDocuments = query({
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }
    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
  },
});

export const getDocument = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new Error("Document not found");
    }

    return {
      ...document,
      documentUrl: await ctx.storage.getUrl(document.storageId),
    };
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    storageId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      userId: identity.subject,
      storageId: args.storageId,
    });

    await ctx.scheduler.runAfter(0, internal.documents.generateDescription, {
      storageId: args.storageId,
      documentId: documentId,
    });
  },
});

export const deleteDocument = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    return await ctx.db.delete(args.documentId);
  },
});

export const updateDescription = internalMutation({
  args: { documentId: v.id("documents"), description: v.string() },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    await ctx.db.patch(args.documentId, { description: args.description });
  },
});

export const generateDescription = internalAction({
  args: { storageId: v.id("_storage"), documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const file = await ctx.storage.get(args.storageId);

    if (!file) {
      throw new Error("File not found");
    }

    const text = await file.text();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `Generate a summary between 1 to 3 lines for this text: ${text}`
    );

    console.log(result.response.text());

    await ctx.runMutation(internal.documents.updateDescription, {
      documentId: args.documentId,
      description: result.response.text(),
    });

    return result.response.text();
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    return await ctx.storage.generateUploadUrl();
  },
});

export const askQuestion = action({
  args: {
    question: v.string(),
    storageId: v.id("_storage"),
    documentId: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const file = await ctx.storage.get(args.storageId);

    if (!file) {
      throw new Error("File not found");
    }

    const text = await file.text();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const existingChat: Doc<"chats">[] = await ctx.runQuery(api.chats.getChat, {
      documentId: args.documentId,
    });

    const chatHistory = existingChat.map((chat) =>
      chat.isHuman
        ? { role: "user", parts: [{ text: chat.text }] }
        : { role: "model", parts: [{ text: chat.text }] }
    );

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `Here's a document for context. I'll ask questions about it later: ${text}`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "I understand. I've reviewed the document you provided. What would you like to know about it?",
            },
          ],
        },
        ...chatHistory,
      ],
    });

    await ctx.runMutation(api.chats.createChat, {
      documentId: args.documentId,
      isHuman: true,
      text: args.question,
    });

    const result = await chat.sendMessage(args.question);
    const response = await result.response;

    await ctx.runMutation(api.chats.createChat, {
      documentId: args.documentId,
      isHuman: false,
      text: response.text(),
    });

    return response;
  },
});
