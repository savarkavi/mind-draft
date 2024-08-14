import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createNote = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const note = await ctx.db.insert("notes", {
      title: args.title,
      userId: identity.subject,
      isArchived: false,
    });
  },
});

export const getNotes = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return notes;
  },
});
