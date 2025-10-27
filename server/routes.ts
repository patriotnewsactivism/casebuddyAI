import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./ai-service";
import multer from "multer";

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Document routes
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getAllDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.get("/api/documents/:id", async (req, res) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch document" });
    }
  });

  app.post("/api/documents/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const content = req.file.buffer.toString("utf-8");
      const name = req.file.originalname;
      const type = req.file.mimetype;
      const size = req.file.size;

      // Create document
      const document = await storage.createDocument({
        name,
        type,
        content,
        size,
        tags: [],
      });

      // Analyze document with AI
      const analysis = await aiService.analyzeDocument(content, name);
      
      // Update document with analysis
      const updatedDoc = await storage.updateDocument(document.id, {
        extractedText: content,
        analysis: analysis as any,
        tags: [...analysis.keyTerms, analysis.documentType],
      });

      // Store knowledge in knowledge base
      await aiService.storeKnowledge(analysis, document.id);

      res.json(updatedDoc);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload document" });
    }
  });

  app.delete("/api/documents/:id", async (req, res) => {
    try {
      const success = await storage.deleteDocument(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Document not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete document" });
    }
  });

  // Template routes
  app.get("/api/templates", async (req, res) => {
    try {
      const templates = await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const template = await storage.getTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  app.get("/api/templates/category/:category", async (req, res) => {
    try {
      const templates = await storage.getTemplatesByCategory(req.params.category);
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const template = await storage.createTemplate(req.body);
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to create template" });
    }
  });

  // Document generation routes
  app.post("/api/generate", async (req, res) => {
    try {
      const { templateId, variables, context, useKnowledgeBase, tone } = req.body;

      const result = await aiService.generateDocument({
        templateId,
        variables,
        context,
        useKnowledgeBase,
        tone,
      });

      // Save generated document
      const template = await storage.getTemplate(templateId);
      const generatedDoc = await storage.createGeneratedDocument({
        name: `Generated ${template?.name || "Document"}`,
        content: result.content,
        templateId,
        variables: variables || {},
        sourceDocuments: [],
        researchUsed: result.researchUsed,
        confidence: result.confidence,
      });

      res.json({
        ...generatedDoc,
        ...result,
      });
    } catch (error) {
      console.error("Generation error:", error);
      res.status(500).json({ error: "Failed to generate document" });
    }
  });

  app.post("/api/improve", async (req, res) => {
    try {
      const { content, instructions, documentType } = req.body;

      const improved = await aiService.improveDocument(
        content,
        instructions,
        documentType
      );

      res.json({ content: improved });
    } catch (error) {
      console.error("Improvement error:", error);
      res.status(500).json({ error: "Failed to improve document" });
    }
  });

  app.post("/api/extract-variables", async (req, res) => {
    try {
      const { content } = req.body;
      const variables = await aiService.extractVariables(content);
      res.json({ variables });
    } catch (error) {
      res.status(500).json({ error: "Failed to extract variables" });
    }
  });

  // Generated documents routes
  app.get("/api/generated", async (req, res) => {
    try {
      const documents = await storage.getAllGeneratedDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch generated documents" });
    }
  });

  app.get("/api/generated/:id", async (req, res) => {
    try {
      const document = await storage.getGeneratedDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch document" });
    }
  });

  // Knowledge base routes
  app.get("/api/knowledge", async (req, res) => {
    try {
      const knowledge = await storage.getAllKnowledge();
      res.json(knowledge);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch knowledge" });
    }
  });

  app.get("/api/knowledge/category/:category", async (req, res) => {
    try {
      const knowledge = await storage.getKnowledgeByCategory(req.params.category);
      res.json(knowledge);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch knowledge" });
    }
  });

  app.get("/api/knowledge/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter required" });
      }
      const knowledge = await storage.searchKnowledge(query);
      res.json(knowledge);
    } catch (error) {
      res.status(500).json({ error: "Failed to search knowledge" });
    }
  });

  app.post("/api/research", async (req, res) => {
    try {
      const { query } = req.body;
      const result = await aiService.performResearch(query);
      res.json(result);
    } catch (error) {
      console.error("Research error:", error);
      res.status(500).json({ error: "Failed to perform research" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
