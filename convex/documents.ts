import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
