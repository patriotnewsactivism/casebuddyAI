# Quick Start Guide - AI Legal Document Generator

## 🚀 Get Started in 3 Steps

### 1. Set Up Your API Key

```bash
# Create .env file
cp .env.example .env

# Edit .env and add your Anthropic API key
# Get your key from: https://console.anthropic.com/
```

Example `.env` file:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
```

### 2. Install Dependencies (if not already done)

```bash
npm install
```

### 3. Start the Application

```bash
npm run dev
```

The app will open at `http://localhost:5000`

## 📚 How to Use

### Upload & Learn
1. Go to **Documents** page
2. Drag and drop a legal document (PDF, DOC, DOCX, or TXT)
3. AI automatically analyzes and extracts legal concepts
4. Knowledge base grows with each document

### Generate Documents
1. Visit **Generate** page
2. Browse templates by category:
   - Contracts (Agreements, NDAs, Employment)
   - Litigation (Demand Letters, Motions)
   - Estate Planning (Power of Attorney)
3. Fill in template variables
4. Enable "Use Knowledge Base" for smarter documents
5. Click "Generate Document"
6. Review, edit, and download

### AI Research
1. Open **AI Research** page
2. Enter your legal question
3. AI searches your knowledge base
4. Get comprehensive research findings
5. Browse learned concepts by category

## 🎯 Key Features

✅ **AI Document Analysis** - Automatic extraction of legal concepts  
✅ **Smart Document Generation** - Context-aware template filling  
✅ **Knowledge Base** - Grows with every document  
✅ **Legal Research** - Query your knowledge base  
✅ **Document Improvement** - Refine with AI assistance  
✅ **6 Professional Templates** - Ready to use  
✅ **Beautiful UI** - Modern, dark-mode enabled

## 🧪 Try These Examples

### Example 1: Upload a Contract
Upload any contract document and watch as the AI:
- Identifies it as a "Contract Agreement"
- Extracts party names, dates, and key terms
- Adds contractual concepts to knowledge base

### Example 2: Generate an NDA
1. Select "Non-Disclosure Agreement" template
2. Fill in party names and confidential info definition
3. AI generates a professional NDA with proper legal language

### Example 3: Legal Research
Ask: "What are the essential elements of a valid contract?"
- AI synthesizes knowledge from uploaded documents
- Provides comprehensive research findings
- Lists relevant concepts

## 📖 Available Templates

1. **Contract Agreement** - General business contracts
2. **Non-Disclosure Agreement (NDA)** - Confidentiality agreements
3. **Demand Letter** - Formal legal demands
4. **Motion to Dismiss** - Court motions
5. **Employment Agreement** - Employment contracts
6. **Power of Attorney** - Legal authority documents

## 🔧 Troubleshooting

**Issue**: Upload fails  
**Solution**: Ensure file is PDF, DOC, DOCX, or TXT under 50MB

**Issue**: Generation takes long  
**Solution**: First generation may take 10-30 seconds (AI processing)

**Issue**: No knowledge base entries  
**Solution**: Upload at least one legal document first

**Issue**: API errors  
**Solution**: Verify ANTHROPIC_API_KEY is set correctly in `.env`

## 💡 Tips for Best Results

1. **Upload Quality Documents**: The better your source documents, the smarter the system becomes
2. **Use Context Field**: Add specific requirements when generating documents
3. **Enable Knowledge Base**: Always enable for more informed documents
4. **Iterate with Improvements**: Use the improve function to refine generated documents
5. **Build Your Library**: Upload diverse legal documents to expand knowledge

## 🔐 Security Notes

- Documents stored in memory only (no persistent database by default)
- API key stored in local `.env` file
- No data sent to third parties except Anthropic API
- File uploads validated and size-limited

## 📈 System Gets Smarter

Every uploaded document:
- ✅ Is analyzed by Claude 3.5 Sonnet
- ✅ Contributes legal concepts to knowledge base
- ✅ Improves future document generation
- ✅ Enhances research capabilities

## 🆘 Need Help?

1. Check console for error messages
2. Verify `.env` file has valid API key
3. Ensure documents are supported formats
4. Try refreshing the page
5. Check you have internet connection

---

**Built with AI** - Claude 3.5 Sonnet powers this intelligent legal assistant

Ready to start? Run `npm run dev` and navigate to `http://localhost:5000`
