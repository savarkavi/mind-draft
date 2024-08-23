import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { createChat } from "./chats";
import { api } from "../convex/_generated/api";

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

    await ctx.db.insert("documents", {
      title: args.title,
      userId: identity.subject,
      storageId: args.storageId,
    });
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

    return response.text();
  },
});
