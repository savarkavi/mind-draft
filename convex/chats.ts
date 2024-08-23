import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getChat = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const chats = await ctx.db
      .query("chats")
      .withIndex("by_documentId_user", (q) =>
        q.eq("documentId", args.documentId)
      )
      .collect();

    return chats;
  },
});

export const createChat = mutation({
  args: {
    documentId: v.id("documents"),
    text: v.string(),
    isHuman: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    await ctx.db.insert("chats", {
      documentId: args.documentId,
      userId: identity.subject,
      isHuman: args.isHuman,
      text: args.text,
    });
  },
});
