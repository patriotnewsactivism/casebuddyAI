# AI Legal Document Generation System

An intelligent legal document generation application that functions like an experienced attorney or paralegal. The system continuously learns from documents it processes, building a knowledge base that makes each generated document more informed and professional.

## 🎯 Key Features

### 1. **Intelligent Document Analysis**
- **AI-Powered Analysis**: Every uploaded document is analyzed by Claude 3.5 Sonnet
- **Knowledge Extraction**: Automatically extracts legal concepts, precedents, and key terms
- **Learning System**: Builds a growing knowledge base from every document processed
- **Metadata Generation**: Auto-tags documents with relevant categories and concepts

### 2. **Professional Document Generation**
- **Template Library**: Pre-built templates for common legal documents:
  - Contract Agreements
  - Non-Disclosure Agreements (NDAs)
  - Demand Letters
  - Motions to Dismiss
  - Employment Agreements
  - Power of Attorney
  - And more...
- **Smart Variable Filling**: AI intelligently fills template variables based on context
- **Knowledge Base Integration**: Incorporates learned legal concepts into generated documents
- **Customizable Tone**: Choose between formal, professional, or casual tones

### 3. **Document Improvement**
- **AI Enhancement**: Refine existing documents with specific instructions
- **Legal Accuracy**: Ensures proper legal terminology and formatting
- **Context-Aware**: Uses knowledge base to improve legal soundness

### 4. **Legal Research Assistant**
- **Knowledge Search**: Query your growing knowledge base
- **Concept Synthesis**: AI combines multiple sources for comprehensive research
- **Citation Tracking**: Maintains references to source documents

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Anthropic API Key

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Configure environment variables**:
```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:
```env
ANTHROPIC_API_KEY=your_api_key_here
```

Get your API key from: https://console.anthropic.com/

3. **Start the application**:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📖 How to Use

### Step 1: Build Your Knowledge Base

1. Navigate to **Documents** page
2. Upload legal documents (PDF, DOC, DOCX, TXT)
3. AI automatically:
   - Analyzes document content
   - Extracts legal concepts
   - Identifies key terms and parties
   - Stores knowledge for future use

### Step 2: Generate Documents

1. Go to **Generate** page
2. Select a template category
3. Choose your template
4. Fill in required variables
5. Enable "Use Knowledge Base" to incorporate learned concepts
6. Click "Generate Document"
7. AI creates a professionally drafted document

### Step 3: Refine and Improve

1. Review the generated document
2. Add improvement instructions (e.g., "Make more concise", "Add more detail about liability")
3. Click "Improve Document"
4. AI enhances the document based on your feedback

### Step 4: Research and Learn

1. Check the **Knowledge Base** tab to see learned concepts
2. Use the knowledge search to find relevant precedents
3. Browse by category to understand what the system has learned

## 🧠 How It Gets Smarter

The system continuously improves through:

1. **Document Processing**:
   - Each uploaded document is analyzed
   - Legal concepts, terms, and precedents are extracted
   - Information is categorized and stored

2. **Knowledge Base Growth**:
   - Every document contributes to the knowledge base
   - Concepts are linked across documents
   - Relevance scores help prioritize information

3. **Context-Aware Generation**:
   - When generating documents, AI searches knowledge base
   - Relevant concepts are incorporated automatically
   - Citations and references are maintained

4. **Continuous Learning**:
   - More documents = more knowledge
   - Better understanding of your legal domain
   - More accurate and detailed document generation

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (React)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐   │
│  │Documents │  │ Generate │  │ Research │  │Knowledge│   │
│  │  Upload  │  │   Page   │  │   Page   │  │  Base   │   │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                     REST API (Express)
                            │
┌───────────────────────────┴─────────────────────────────────┐
│                      Server                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              AI Service (Claude 3.5)                  │  │
│  │  • Document Analysis    • Template Generation        │  │
│  │  • Knowledge Extraction • Document Improvement       │  │
│  │  • Legal Research       • Variable Extraction        │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Storage Layer                        │  │
│  │  • Documents        • Templates                       │  │
│  │  • Knowledge Base   • Generated Documents            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Technical Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Radix UI** components
- **Tailwind CSS** for styling

### Backend
- **Express** server
- **Anthropic Claude 3.5 Sonnet** for AI processing
- **Multer** for file uploads
- **In-memory storage** (easily replaceable with PostgreSQL)

## 📝 Available Templates

1. **Contracts**
   - General Contract Agreement
   - Non-Disclosure Agreement (NDA)
   - Employment Agreement

2. **Litigation**
   - Demand Letter
   - Motion to Dismiss

3. **Estate Planning**
   - Power of Attorney

*More templates can be easily added through the template system.*

## 🔐 Security & Privacy

- Documents are processed server-side
- In-memory storage (no persistent database by default)
- API keys stored in environment variables
- File upload size limits enforced
- Input validation on all endpoints

## 🎨 Customization

### Adding New Templates

Edit `/workspace/server/storage.ts` in the `initializeDefaultTemplates()` method:

```typescript
{
  name: "Your Template Name",
  category: "Category",
  description: "Description",
  content: "Template content with {{variables}}",
  variables: ["variable1", "variable2"]
}
```

### Extending AI Capabilities

Edit `/workspace/server/ai-service.ts` to:
- Modify analysis depth
- Add new AI features
- Customize prompts
- Integrate additional AI models

## 📈 Future Enhancements

Potential improvements:
- [ ] PostgreSQL integration for persistent storage
- [ ] Multi-user support with authentication
- [ ] Document version control
- [ ] Collaborative editing
- [ ] Advanced search with vector embeddings
- [ ] Export to PDF/DOCX formats
- [ ] Custom template builder UI
- [ ] Integration with legal databases
- [ ] Batch document processing
- [ ] Analytics dashboard

## 🤝 Contributing

This is a demonstration project showing the power of AI-assisted legal document generation. Feel free to extend and customize for your needs.

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues or questions:
1. Check the console for error messages
2. Verify your API key is set correctly
3. Ensure documents are in supported formats (PDF, DOC, DOCX, TXT)
4. Check that you have sufficient API credits

## 🎓 Learn More

- [Anthropic Claude Documentation](https://docs.anthropic.com/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)

---

Built with ❤️ using AI technology to make legal document creation accessible and intelligent.
