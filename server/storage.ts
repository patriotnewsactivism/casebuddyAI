import { 
  type User, 
  type InsertUser,
  type Document,
  type InsertDocument,
  type Template,
  type InsertTemplate,
  type KnowledgeBase,
  type InsertKnowledgeBase,
  type GeneratedDocument,
  type InsertGeneratedDocument
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Document methods
  getDocument(id: string): Promise<Document | undefined>;
  getAllDocuments(): Promise<Document[]>;
  createDocument(doc: Omit<InsertDocument, 'id'>): Promise<Document>;
  updateDocument(id: string, doc: Partial<Document>): Promise<Document | undefined>;
  deleteDocument(id: string): Promise<boolean>;
  
  // Template methods
  getTemplate(id: string): Promise<Template | undefined>;
  getAllTemplates(): Promise<Template[]>;
  getTemplatesByCategory(category: string): Promise<Template[]>;
  createTemplate(template: Omit<InsertTemplate, 'id'>): Promise<Template>;
  
  // Knowledge Base methods
  getKnowledge(id: string): Promise<KnowledgeBase | undefined>;
  getAllKnowledge(): Promise<KnowledgeBase[]>;
  getKnowledgeByCategory(category: string): Promise<KnowledgeBase[]>;
  createKnowledge(knowledge: Omit<InsertKnowledgeBase, 'id'>): Promise<KnowledgeBase>;
  searchKnowledge(query: string): Promise<KnowledgeBase[]>;
  
  // Generated Document methods
  getGeneratedDocument(id: string): Promise<GeneratedDocument | undefined>;
  getAllGeneratedDocuments(): Promise<GeneratedDocument[]>;
  createGeneratedDocument(doc: Omit<InsertGeneratedDocument, 'id'>): Promise<GeneratedDocument>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private documents: Map<string, Document>;
  private templates: Map<string, Template>;
  private knowledgeBase: Map<string, KnowledgeBase>;
  private generatedDocuments: Map<string, GeneratedDocument>;

  constructor() {
    this.users = new Map();
    this.documents = new Map();
    this.templates = new Map();
    this.knowledgeBase = new Map();
    this.generatedDocuments = new Map();
    
    // Initialize with some default templates
    this.initializeDefaultTemplates();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Document methods
  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }

  async createDocument(doc: Omit<InsertDocument, 'id'>): Promise<Document> {
    const id = randomUUID();
    const document: Document = { 
      ...doc, 
      id,
      uploadDate: new Date(),
      extractedText: doc.extractedText ?? null,
      analysis: doc.analysis ?? null,
      metadata: doc.metadata ?? null,
      tags: doc.tags ?? null,
      size: doc.size ?? null,
      userId: doc.userId ?? null
    };
    this.documents.set(id, document);
    return document;
  }

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document | undefined> {
    const doc = this.documents.get(id);
    if (!doc) return undefined;
    
    const updated = { ...doc, ...updates };
    this.documents.set(id, updated);
    return updated;
  }

  async deleteDocument(id: string): Promise<boolean> {
    return this.documents.delete(id);
  }

  // Template methods
  async getTemplate(id: string): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getAllTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async getTemplatesByCategory(category: string): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(t => t.category === category);
  }

  async createTemplate(template: Omit<InsertTemplate, 'id'>): Promise<Template> {
    const id = randomUUID();
    const newTemplate: Template = {
      ...template,
      id,
      description: template.description ?? null,
      structure: template.structure ?? null,
      variables: template.variables ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.templates.set(id, newTemplate);
    return newTemplate;
  }

  // Knowledge Base methods
  async getKnowledge(id: string): Promise<KnowledgeBase | undefined> {
    return this.knowledgeBase.get(id);
  }

  async getAllKnowledge(): Promise<KnowledgeBase[]> {
    return Array.from(this.knowledgeBase.values());
  }

  async getKnowledgeByCategory(category: string): Promise<KnowledgeBase[]> {
    return Array.from(this.knowledgeBase.values()).filter(k => k.category === category);
  }

  async createKnowledge(knowledge: Omit<InsertKnowledgeBase, 'id'>): Promise<KnowledgeBase> {
    const id = randomUUID();
    const newKnowledge: KnowledgeBase = {
      ...knowledge,
      id,
      sourceDocumentId: knowledge.sourceDocumentId ?? null,
      citations: knowledge.citations ?? null,
      relevanceScore: knowledge.relevanceScore ?? null,
      metadata: knowledge.metadata ?? null,
      createdAt: new Date()
    };
    this.knowledgeBase.set(id, newKnowledge);
    return newKnowledge;
  }

  async searchKnowledge(query: string): Promise<KnowledgeBase[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.knowledgeBase.values()).filter(k => 
      k.legalConcept.toLowerCase().includes(lowerQuery) ||
      k.content.toLowerCase().includes(lowerQuery) ||
      k.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Generated Document methods
  async getGeneratedDocument(id: string): Promise<GeneratedDocument | undefined> {
    return this.generatedDocuments.get(id);
  }

  async getAllGeneratedDocuments(): Promise<GeneratedDocument[]> {
    return Array.from(this.generatedDocuments.values());
  }

  async createGeneratedDocument(doc: Omit<InsertGeneratedDocument, 'id'>): Promise<GeneratedDocument> {
    const id = randomUUID();
    const newDoc: GeneratedDocument = {
      ...doc,
      id,
      templateId: doc.templateId ?? null,
      variables: doc.variables ?? null,
      sourceDocuments: doc.sourceDocuments ?? null,
      researchUsed: doc.researchUsed ?? null,
      confidence: doc.confidence ?? null,
      createdAt: new Date(),
      userId: doc.userId ?? null
    };
    this.generatedDocuments.set(id, newDoc);
    return newDoc;
  }

  private initializeDefaultTemplates() {
    const templates = [
      {
        name: "Contract Agreement",
        category: "Contracts",
        description: "Standard business contract template",
        content: `AGREEMENT

This Agreement is entered into as of {{date}} between {{party1_name}} ("Party A") and {{party2_name}} ("Party B").

WHEREAS, the parties wish to {{purpose}};

NOW, THEREFORE, in consideration of the mutual covenants and agreements herein contained, the parties agree as follows:

1. SCOPE OF WORK
{{scope_of_work}}

2. TERM
This Agreement shall commence on {{start_date}} and continue until {{end_date}}.

3. COMPENSATION
{{compensation_terms}}

4. TERMINATION
Either party may terminate this Agreement with {{notice_period}} days written notice.

5. GOVERNING LAW
This Agreement shall be governed by the laws of {{jurisdiction}}.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.

______________________          ______________________
{{party1_name}}                 {{party2_name}}
Party A                         Party B`,
        structure: null,
        variables: ["date", "party1_name", "party2_name", "purpose", "scope_of_work", "start_date", "end_date", "compensation_terms", "notice_period", "jurisdiction"]
      },
      {
        name: "Non-Disclosure Agreement (NDA)",
        category: "Contracts",
        description: "Mutual non-disclosure agreement",
        content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of {{date}} by and between {{party1_name}} and {{party2_name}}.

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means {{confidential_info_definition}}.

2. OBLIGATIONS
The receiving party agrees to:
- Maintain confidentiality of all Confidential Information
- Not disclose to third parties without prior written consent
- Use Confidential Information solely for {{purpose}}

3. TERM
This Agreement shall remain in effect for {{term_years}} years from the date of execution.

4. RETURN OF MATERIALS
Upon termination, all Confidential Information must be returned or destroyed.

5. REMEDIES
The parties acknowledge that breach may cause irreparable harm and equitable relief may be sought.

IN WITNESS WHEREOF, the parties have executed this Agreement.

______________________          ______________________
{{party1_name}}                 {{party2_name}}`,
        structure: null,
        variables: ["date", "party1_name", "party2_name", "confidential_info_definition", "purpose", "term_years"]
      },
      {
        name: "Demand Letter",
        category: "Litigation",
        description: "Formal demand letter template",
        content: `{{sender_name}}
{{sender_address}}
{{sender_phone}}
{{sender_email}}

{{date}}

{{recipient_name}}
{{recipient_address}}

Re: {{subject_matter}}

Dear {{recipient_name}}:

I am writing on behalf of {{client_name}} regarding {{issue_description}}.

BACKGROUND
{{background_facts}}

LEGAL BASIS
{{legal_basis}}

DEMAND
We hereby demand that you {{specific_demand}} within {{deadline_days}} days of receipt of this letter.

CONSEQUENCES OF NON-COMPLIANCE
Failure to comply with this demand will result in {{consequences}}, including but not limited to legal action to recover damages, costs, and attorney's fees.

Please contact me immediately to resolve this matter.

Sincerely,

______________________
{{sender_name}}
{{sender_title}}`,
        structure: null,
        variables: ["sender_name", "sender_address", "sender_phone", "sender_email", "date", "recipient_name", "recipient_address", "subject_matter", "client_name", "issue_description", "background_facts", "legal_basis", "specific_demand", "deadline_days", "consequences", "sender_title"]
      },
      {
        name: "Motion to Dismiss",
        category: "Litigation",
        description: "Motion to dismiss legal complaint",
        content: `[COURT HEADER]
{{court_name}}
{{case_number}}

{{plaintiff_name}},
    Plaintiff,
v.
{{defendant_name}},
    Defendant.

MOTION TO DISMISS

Defendant {{defendant_name}}, by and through undersigned counsel, respectfully moves this Court to dismiss Plaintiff's Complaint pursuant to {{legal_standard}} and states:

INTRODUCTION
{{introduction}}

FACTUAL BACKGROUND
{{factual_background}}

LEGAL STANDARD
{{legal_standard_explanation}}

ARGUMENT
{{argument_section}}

CONCLUSION
For the foregoing reasons, Defendant respectfully requests that this Court grant this Motion to Dismiss.

Respectfully submitted,

______________________
{{attorney_name}}
{{bar_number}}
Attorney for Defendant
{{law_firm}}
{{address}}
{{phone}}
{{email}}`,
        structure: null,
        variables: ["court_name", "case_number", "plaintiff_name", "defendant_name", "legal_standard", "introduction", "factual_background", "legal_standard_explanation", "argument_section", "attorney_name", "bar_number", "law_firm", "address", "phone", "email"]
      },
      {
        name: "Employment Agreement",
        category: "Employment",
        description: "Standard employment contract",
        content: `EMPLOYMENT AGREEMENT

This Employment Agreement is entered into as of {{date}} between {{company_name}} ("Employer") and {{employee_name}} ("Employee").

1. POSITION
Employee is hired as {{job_title}} and will perform duties as assigned by {{supervisor_title}}.

2. COMPENSATION
Employee shall receive:
- Base salary: {{salary}} per {{pay_period}}
- Benefits: {{benefits_description}}

3. TERM
Employment begins on {{start_date}} and continues at-will.

4. DUTIES AND RESPONSIBILITIES
{{duties_description}}

5. CONFIDENTIALITY
Employee agrees to maintain confidentiality of proprietary information.

6. NON-COMPETE
{{non_compete_clause}}

7. TERMINATION
Either party may terminate with {{notice_period}} notice.

8. GOVERNING LAW
This Agreement is governed by the laws of {{state}}.

______________________          ______________________
{{company_name}}                {{employee_name}}
By: {{company_rep}}             Employee`,
        structure: null,
        variables: ["date", "company_name", "employee_name", "job_title", "supervisor_title", "salary", "pay_period", "benefits_description", "start_date", "duties_description", "non_compete_clause", "notice_period", "state", "company_rep"]
      },
      {
        name: "Power of Attorney",
        category: "Estate Planning",
        description: "General power of attorney document",
        content: `GENERAL POWER OF ATTORNEY

I, {{principal_name}}, of {{principal_address}}, hereby appoint {{agent_name}}, of {{agent_address}}, as my attorney-in-fact ("Agent") to act in my name, place and stead in any way which I myself could do, with respect to the following matters:

POWERS GRANTED:
{{powers_granted}}

This Power of Attorney shall:
- Become effective: {{effective_date}}
- Remain in effect until: {{expiration_condition}}

This Power of Attorney {{durability_clause}}.

DATED: {{date}}

______________________
{{principal_name}}, Principal

ACKNOWLEDGMENT
{{notary_section}}`,
        structure: null,
        variables: ["principal_name", "principal_address", "agent_name", "agent_address", "powers_granted", "effective_date", "expiration_condition", "durability_clause", "date", "notary_section"]
      }
    ];

    templates.forEach(template => {
      const id = randomUUID();
      this.templates.set(id, {
        id,
        ...template,
        description: template.description,
        structure: template.structure,
        variables: template.variables,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
  }
}

export const storage = new MemStorage();
