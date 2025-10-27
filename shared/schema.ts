import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  content: text("content").notNull(),
  extractedText: text("extracted_text"),
  analysis: jsonb("analysis"),
  metadata: jsonb("metadata"),
  tags: text("tags").array(),
  size: integer("size"),
  uploadDate: timestamp("upload_date").defaultNow(),
  userId: varchar("user_id").references(() => users.id),
});

export const templates = pgTable("templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  structure: jsonb("structure"),
  variables: text("variables").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const knowledgeBase = pgTable("knowledge_base", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sourceDocumentId: varchar("source_document_id").references(() => documents.id),
  category: text("category").notNull(),
  legalConcept: text("legal_concept").notNull(),
  content: text("content").notNull(),
  citations: text("citations").array(),
  relevanceScore: integer("relevance_score"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const generatedDocuments = pgTable("generated_documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateId: varchar("template_id").references(() => templates.id),
  name: text("name").notNull(),
  content: text("content").notNull(),
  variables: jsonb("variables"),
  sourceDocuments: text("source_documents").array(),
  researchUsed: text("research_used").array(),
  confidence: integer("confidence"),
  createdAt: timestamp("created_at").defaultNow(),
  userId: varchar("user_id").references(() => users.id),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertDocumentSchema = createInsertSchema(documents);
export const insertTemplateSchema = createInsertSchema(templates);
export const insertKnowledgeBaseSchema = createInsertSchema(knowledgeBase);
export const insertGeneratedDocumentSchema = createInsertSchema(generatedDocuments);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type KnowledgeBase = typeof knowledgeBase.$inferSelect;
export type InsertKnowledgeBase = z.infer<typeof insertKnowledgeBaseSchema>;
export type GeneratedDocument = typeof generatedDocuments.$inferSelect;
export type InsertGeneratedDocument = z.infer<typeof insertGeneratedDocumentSchema>;
