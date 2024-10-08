import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    userId: v.string(),
    storageId: v.id("_storage"),
  }).index("by_user", ["userId"]),
  notes: defineTable({
    title: v.string(),
    content: v.optional(v.string()),
    userId: v.string(),
    isArchived: v.boolean(),
    coverImage: v.optional(v.string()),
  }).index("by_user", ["userId"]),
  chats: defineTable({
    documentId: v.id("documents"),
    userId: v.string(),
    isHuman: v.boolean(),
    text: v.string(),
  }).index("by_documentId_user", ["documentId", "userId"]),
});
