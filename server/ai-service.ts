import Anthropic from "@anthropic-ai/sdk";
import { storage } from "./storage";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export interface DocumentAnalysis {
  summary: string;
  keyTerms: string[];
  legalConcepts: string[];
  documentType: string;
  jurisdiction?: string;
  parties?: string[];
  dates?: string[];
  extractedKnowledge: {
    concept: string;
    content: string;
    category: string;
  }[];
}

export interface GenerationRequest {
  templateId: string;
  variables?: Record<string, string>;
  context?: string;
  useKnowledgeBase?: boolean;
  tone?: "formal" | "professional" | "casual";
}

export class AIService {
  /**
   * Analyzes a legal document and extracts knowledge
   */
  async analyzeDocument(content: string, documentName: string): Promise<DocumentAnalysis> {
    const prompt = `You are an expert legal document analyst. Analyze the following legal document and extract key information.

Document: ${documentName}

Content:
${content}

Please provide a comprehensive analysis in JSON format with the following structure:
{
  "summary": "Brief summary of the document",
  "keyTerms": ["array", "of", "important", "terms"],
  "legalConcepts": ["array", "of", "legal", "concepts"],
  "documentType": "type of legal document (e.g., contract, motion, agreement)",
  "jurisdiction": "if mentioned, the jurisdiction",
  "parties": ["array", "of", "parties", "mentioned"],
  "dates": ["array", "of", "important", "dates"],
  "extractedKnowledge": [
    {
      "concept": "Legal concept name",
      "content": "Detailed explanation or precedent",
      "category": "Category (e.g., Contract Law, Civil Procedure, etc.)"
    }
  ]
}

Provide only valid JSON, no other text.`;

    try {
      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const responseText = message.content[0].type === "text" ? message.content[0].text : "";
      const analysis = JSON.parse(responseText);

      return analysis;
    } catch (error) {
      console.error("Error analyzing document:", error);
      // Return a basic analysis if AI fails
      return {
        summary: `Document: ${documentName}`,
        keyTerms: [],
        legalConcepts: [],
        documentType: "Unknown",
        extractedKnowledge: [],
      };
    }
  }

  /**
   * Stores extracted knowledge in the knowledge base
   */
  async storeKnowledge(analysis: DocumentAnalysis, documentId: string): Promise<void> {
    for (const knowledge of analysis.extractedKnowledge) {
      await storage.createKnowledge({
        sourceDocumentId: documentId,
        category: knowledge.category,
        legalConcept: knowledge.concept,
        content: knowledge.content,
        citations: [],
        relevanceScore: 85,
        metadata: {
          documentType: analysis.documentType,
          jurisdiction: analysis.jurisdiction,
        },
      });
    }
  }

  /**
   * Generates a legal document from a template
   */
  async generateDocument(request: GenerationRequest): Promise<{
    content: string;
    confidence: number;
    researchUsed: string[];
  }> {
    const template = await storage.getTemplate(request.templateId);
    if (!template) {
      throw new Error("Template not found");
    }

    // Get relevant knowledge from knowledge base
    let relevantKnowledge: any[] = [];
    if (request.useKnowledgeBase) {
      const allKnowledge = await storage.getAllKnowledge();
      // Get the most relevant knowledge based on template category
      relevantKnowledge = allKnowledge
        .filter((k) => k.category.toLowerCase().includes(template.category.toLowerCase()))
        .slice(0, 5);
    }

    const knowledgeContext = relevantKnowledge.length > 0
      ? `\n\nRelevant Legal Knowledge:\n${relevantKnowledge.map((k) => `- ${k.legalConcept}: ${k.content}`).join("\n")}`
      : "";

    const prompt = `You are an expert attorney drafting a legal document. Your task is to fill in the template with appropriate, legally sound content.

Template: ${template.name}
Category: ${template.category}
Description: ${template.description}

Variables to fill:
${JSON.stringify(request.variables || {}, null, 2)}

${request.context ? `Additional Context:\n${request.context}` : ""}
${knowledgeContext}

Template Content:
${template.content}

Instructions:
1. Fill in ALL template variables with appropriate legal language
2. Ensure the document is legally sound and professionally written
3. Use ${request.tone || "formal"} tone
4. Make the content specific and detailed, not generic
5. Include proper legal terminology and structure
6. If a variable is not provided, generate appropriate content based on context

Return ONLY the filled template content, no explanations or additional text.`;

    try {
      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 8192,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = message.content[0].type === "text" ? message.content[0].text : "";

      return {
        content,
        confidence: 90,
        researchUsed: relevantKnowledge.map((k) => k.id),
      };
    } catch (error) {
      console.error("Error generating document:", error);
      throw new Error("Failed to generate document");
    }
  }

  /**
   * Improves or refines an existing document
   */
  async improveDocument(
    content: string,
    instructions: string,
    documentType?: string
  ): Promise<string> {
    // Get relevant knowledge
    const allKnowledge = await storage.getAllKnowledge();
    const relevantKnowledge = documentType
      ? allKnowledge.filter((k) => 
          k.content.toLowerCase().includes(documentType.toLowerCase()) ||
          k.category.toLowerCase().includes(documentType.toLowerCase())
        ).slice(0, 3)
      : [];

    const knowledgeContext = relevantKnowledge.length > 0
      ? `\n\nRelevant Legal Knowledge to incorporate:\n${relevantKnowledge.map((k) => `- ${k.legalConcept}: ${k.content}`).join("\n")}`
      : "";

    const prompt = `You are an expert attorney reviewing and improving a legal document.

Current Document:
${content}

Instructions for improvement:
${instructions}
${knowledgeContext}

Please provide an improved version of the document that:
1. Addresses all the improvement instructions
2. Maintains legal accuracy and professionalism
3. Incorporates relevant legal knowledge when appropriate
4. Uses proper legal formatting and terminology
5. Is clear, concise, and comprehensive

Return ONLY the improved document content, no explanations.`;

    try {
      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 8192,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      return message.content[0].type === "text" ? message.content[0].text : content;
    } catch (error) {
      console.error("Error improving document:", error);
      throw new Error("Failed to improve document");
    }
  }

  /**
   * Extracts variables from a document that could be used with templates
   */
  async extractVariables(content: string): Promise<Record<string, string>> {
    const prompt = `Analyze this legal document and extract key variables that could be used to generate similar documents.

Document:
${content}

Extract variables like party names, dates, amounts, terms, etc. in JSON format:
{
  "variable_name": "value",
  ...
}

Provide only valid JSON, no other text.`;

    try {
      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const responseText = message.content[0].type === "text" ? message.content[0].text : "{}";
      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error extracting variables:", error);
      return {};
    }
  }

  /**
   * Performs legal research on a topic using the knowledge base
   */
  async performResearch(query: string): Promise<{
    findings: string;
    sources: string[];
    relevantConcepts: string[];
  }> {
    const knowledge = await storage.searchKnowledge(query);

    const researchContext = knowledge.length > 0
      ? knowledge.map((k) => `${k.legalConcept}: ${k.content}`).join("\n\n")
      : "No specific knowledge found in database.";

    const prompt = `You are a legal researcher. Conduct research on the following topic using the available knowledge base.

Research Query: ${query}

Available Knowledge:
${researchContext}

Provide a comprehensive research summary that:
1. Synthesizes the available information
2. Identifies key legal concepts and principles
3. Provides practical insights
4. Suggests areas where additional research may be needed

Format your response as JSON:
{
  "findings": "Comprehensive research findings",
  "sources": ["array of source references"],
  "relevantConcepts": ["array of relevant legal concepts"]
}`;

    try {
      const message = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const responseText = message.content[0].type === "text" ? message.content[0].text : "";
      return JSON.parse(responseText);
    } catch (error) {
      console.error("Error performing research:", error);
      return {
        findings: "Research could not be completed.",
        sources: [],
        relevantConcepts: [],
      };
    }
  }
}

export const aiService = new AIService();
