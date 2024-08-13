import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({ title: v.string() }),
  notes: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    userId: v.string(),
    isArchived: v.boolean(),
    coverImage: v.optional(v.string()),
  }),
});
