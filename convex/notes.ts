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

export const archiveNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const existingNote = await ctx.db.get(args.id);

    if (!existingNote) {
      throw new Error("Note not found");
    }

    if (existingNote.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    const note = await ctx.db.patch(args.id, { isArchived: true });

    return note;
  },
});

export const getArchivedNotes = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return notes;
  },
});

export const deleteNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const existingNote = await ctx.db.get(args.id);

    if (!existingNote) {
      throw new Error("Note not found");
    }

    if (existingNote.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    const deletedNote = await ctx.db.delete(args.id);

    return deletedNote;
  },
});

export const restoreNote = mutation({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const existingNote = await ctx.db.get(args.id);

    if (!existingNote) {
      throw new Error("Note not found");
    }

    if (existingNote.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    const restoredNote = await ctx.db.patch(args.id, { isArchived: false });

    return restoredNote;
  },
});

export const getNote = query({
  args: { id: v.id("notes") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("User not authenticated");
    }

    const existingNote = await ctx.db.get(args.id);

    if (!existingNote) {
      throw new Error("Note not found");
    }

    if (existingNote.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    return existingNote;
  },
});
