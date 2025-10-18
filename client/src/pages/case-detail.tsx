import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CaseHeader } from "@/components/case-header";
import { DocumentList } from "@/components/document-list";
import { TimelineView } from "@/components/timeline-view";
import { AIInsightPanel } from "@/components/ai-insight-panel";
import { EvidenceGrid } from "@/components/evidence-grid";
import { UploadZone } from "@/components/upload-zone";

//todo: remove mock functionality
const mockDocuments = [
  {
    id: "1",
    name: "Initial Complaint",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "Jan 15, 2024",
    tags: ["Filing", "Primary"],
  },
  {
    id: "2",
    name: "Evidence Photos",
    type: "ZIP",
    size: "15.8 MB",
    uploadDate: "Jan 20, 2024",
    tags: ["Evidence"],
  },
  {
    id: "3",
    name: "Witness Statement - John Doe",
    type: "DOCX",
    size: "145 KB",
    uploadDate: "Jan 22, 2024",
    tags: ["Testimony", "Important"],
  },
];

const mockTimeline = [
  {
    id: "1",
    date: "Jan 15, 2024",
    title: "Case Filed",
    description: "Initial complaint filed with Superior Court",
    status: "completed" as const,
    type: "Filing",
  },
  {
    id: "2",
    date: "Feb 1, 2024",
    title: "Discovery Phase Begins",
    description: "All discovery requests must be submitted by this date",
    status: "upcoming" as const,
    type: "Deadline",
  },
  {
    id: "3",
    date: "Feb 28, 2024",
    title: "Motion to Dismiss Hearing",
    description: "Oral arguments on defendant's motion to dismiss",
    status: "upcoming" as const,
    type: "Hearing",
  },
  {
    id: "4",
    date: "Mar 20, 2024",
    title: "Trial Date",
    description: "Scheduled trial date - jury selection begins",
    status: "pending" as const,
    type: "Trial",
  },
];

const mockEvidence = [
  {
    id: "1",
    name: "Employment Contract",
    type: "document" as const,
    classification: "Contract",
    relevance: "high" as const,
    aiScore: 94,
  },
  {
    id: "2",
    name: "Security Camera Footage",
    type: "video" as const,
    classification: "Video Evidence",
    relevance: "high" as const,
    aiScore: 88,
  },
  {
    id: "3",
    name: "Email Thread - Jan 2024",
    type: "document" as const,
    classification: "Communication",
    relevance: "medium" as const,
    aiScore: 72,
  },
];

const mockInsights = [
  {
    type: "success" as const,
    title: "Strong Case Foundation",
    description: "Document analysis shows 92% alignment with successful precedents in similar cases.",
    confidence: 92,
  },
  {
    type: "info" as const,
    title: "Evidence Completeness",
    description: "All required evidence categories are represented. Consider adding expert testimony.",
    confidence: 85,
  },
];

export default function CaseDetail() {
  return (
    <div className="space-y-6">
      <CaseHeader
        caseNumber="CV-2024-001234"
        title="Smith v. Johnson"
        status="active"
        filingDate="Jan 15, 2024"
        courtDate="Mar 20, 2024"
        documentCount={24}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="documents" className="space-y-4">
            <TabsList data-testid="case-tabs">
              <TabsTrigger value="documents" data-testid="tab-documents">Documents</TabsTrigger>
              <TabsTrigger value="timeline" data-testid="tab-timeline">Timeline</TabsTrigger>
              <TabsTrigger value="evidence" data-testid="tab-evidence">Evidence</TabsTrigger>
            </TabsList>
            <TabsContent value="documents" className="space-y-4">
              <UploadZone />
              <DocumentList documents={mockDocuments} />
            </TabsContent>
            <TabsContent value="timeline">
              <TimelineView events={mockTimeline} />
            </TabsContent>
            <TabsContent value="evidence">
              <EvidenceGrid evidence={mockEvidence} />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <AIInsightPanel insights={mockInsights} />
        </div>
      </div>
    </div>
  );
}
