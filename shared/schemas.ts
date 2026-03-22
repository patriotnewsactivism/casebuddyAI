import { z } from "zod";

// Document schemas
export const documentSchema = z.object({
  name: z.string().min(1).max(255),
  type: z.string().min(1).max(100),
  content: z.string().optional(),
  size: z.number().int().positive(),
  tags: z.array(z.string()).default([]),
  extractedText: z.string().optional(),
  analysis: z.any().optional(),
});

export const documentUploadSchema = z.object({
  file: z.any().refine((val) => val && val.buffer, {
    message: "File is required",
  }),
});

export const documentIdSchema = z.object({
  id: z.string().uuid(),
});

// Template schemas
export const templateSchema = z.object({
  name: z.string().min(1).max(255),
  category: z.string().min(1).max(100),
  content: z.string().min(1),
  description: z.string().optional(),
  variables: z.array(z.string()).default([]),
  example: z.string().optional(),
});

export const templateIdSchema = z.object({
  id: z.string().uuid(),
});

export const templateCategorySchema = z.object({
  category: z.string().min(1).max(100),
});

// Generation schemas
export const generationRequestSchema = z.object({
  templateId: z.string().uuid(),
  variables: z.record(z.string(), z.any()).default({}),
  context: z.string().optional(),
  useKnowledgeBase: z.boolean().default(true),
  tone: z.enum(["formal", "professional", "casual"]).default("professional"),
});

export const improvementRequestSchema = z.object({
  content: z.string().min(1),
  instructions: z.string().min(1),
  documentType: z.string().optional(),
});

export const variableExtractionSchema = z.object({
  content: z.string().min(1),
});

// Knowledge base schemas
export const knowledgeSearchSchema = z.object({
  q: z.string().min(1).max(500),
});

export const knowledgeCategorySchema = z.object({
  category: z.string().min(1).max(100),
});

// Research schemas
export const researchRequestSchema = z.object({
  query: z.string().min(1).max(1000),
});

// Pagination schemas
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Request validation schemas
export const apiSchemas = {
  document: {
    upload: documentUploadSchema,
    get: documentIdSchema,
    delete: documentIdSchema,
  },
  template: {
    create: templateSchema,
    get: templateIdSchema,
    getByCategory: templateCategorySchema,
  },
  generation: {
    generate: generationRequestSchema,
    improve: improvementRequestSchema,
    extractVariables: variableExtractionSchema,
  },
  knowledge: {
    search: knowledgeSearchSchema,
    getByCategory: knowledgeCategorySchema,
  },
  research: {
    perform: researchRequestSchema,
  },
} as const;

// Type exports
export type Document = z.infer<typeof documentSchema>;
export type Template = z.infer<typeof templateSchema>;
export type GenerationRequest = z.infer<typeof generationRequestSchema>;
export type ImprovementRequest = z.infer<typeof improvementRequestSchema>;
export type ResearchRequest = z.infer<typeof researchRequestSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
