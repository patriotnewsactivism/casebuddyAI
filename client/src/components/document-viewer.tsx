import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Edit2, 
  Save, 
  X, 
  FileText, 
  Brain, 
  Tags,
  Calendar,
  FileType
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentViewerProps {
  document: {
    id: string;
    name: string;
    type: string;
    content: string;
    extractedText?: string | null;
    analysis?: any;
    tags?: string[] | null;
    uploadDate?: Date | null;
    size?: number | null;
  };
  onClose?: () => void;
  onSave?: (content: string) => void;
}

export function DocumentViewer({ document, onClose, onSave }: DocumentViewerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(document.content);
  const { toast } = useToast();

  const handleSave = () => {
    if (onSave) {
      onSave(editedContent);
    }
    setIsEditing(false);
    toast({
      title: "Document Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([editedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = globalThis.document.createElement("a");
    link.href = url;
    link.download = document.name || "document.txt";
    globalThis.document.body.appendChild(link);
    link.click();
    globalThis.document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: `${document.name} is being downloaded.`,
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">{document.name}</CardTitle>
              <CardDescription className="mt-2 flex flex-wrap gap-2">
                <span className="flex items-center gap-1">
                  <FileType className="h-4 w-4" />
                  {document.type}
                </span>
                {document.uploadDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </span>
                )}
                {document.size && (
                  <span>
                    {(document.size / 1024).toFixed(1)} KB
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={() => setIsEditing(false)} size="sm" variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)} size="sm" variant="outline">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button onClick={handleDownload} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
              {onClose && (
                <Button onClick={onClose} size="sm" variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="content" className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b px-6">
            <TabsList>
              <TabsTrigger value="content">
                <FileText className="h-4 w-4 mr-2" />
                Content
              </TabsTrigger>
              {document.analysis && (
                <TabsTrigger value="analysis">
                  <Brain className="h-4 w-4 mr-2" />
                  AI Analysis
                </TabsTrigger>
              )}
              {document.tags && document.tags.length > 0 && (
                <TabsTrigger value="metadata">
                  <Tags className="h-4 w-4 mr-2" />
                  Metadata
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <TabsContent value="content" className="flex-1 overflow-auto p-6 m-0">
            {isEditing ? (
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
              />
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-lg">
                  {editedContent}
                </pre>
              </div>
            )}
          </TabsContent>

          {document.analysis && (
            <TabsContent value="analysis" className="flex-1 overflow-auto p-6 m-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p className="text-muted-foreground">{document.analysis.summary}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Document Type</h3>
                  <Badge variant="secondary" className="text-sm">
                    {document.analysis.documentType}
                  </Badge>
                </div>

                {document.analysis.jurisdiction && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Jurisdiction</h3>
                    <p className="text-muted-foreground">{document.analysis.jurisdiction}</p>
                  </div>
                )}

                {document.analysis.parties && document.analysis.parties.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Parties</h3>
                    <div className="flex flex-wrap gap-2">
                      {document.analysis.parties.map((party: string, idx: number) => (
                        <Badge key={idx} variant="outline">{party}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {document.analysis.keyTerms && document.analysis.keyTerms.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Key Terms</h3>
                    <div className="flex flex-wrap gap-2">
                      {document.analysis.keyTerms.map((term: string, idx: number) => (
                        <Badge key={idx} variant="secondary">{term}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {document.analysis.legalConcepts && document.analysis.legalConcepts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Legal Concepts</h3>
                    <div className="flex flex-wrap gap-2">
                      {document.analysis.legalConcepts.map((concept: string, idx: number) => (
                        <Badge key={idx}>{concept}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {document.analysis.dates && document.analysis.dates.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Important Dates</h3>
                    <div className="space-y-1">
                      {document.analysis.dates.map((date: string, idx: number) => (
                        <p key={idx} className="text-sm text-muted-foreground">{date}</p>
                      ))}
                    </div>
                  </div>
                )}

                {document.analysis.extractedKnowledge && document.analysis.extractedKnowledge.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Extracted Knowledge</h3>
                    <div className="space-y-4">
                      {document.analysis.extractedKnowledge.map((knowledge: any, idx: number) => (
                        <Card key={idx}>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-base">{knowledge.concept}</CardTitle>
                              <Badge variant="outline">{knowledge.category}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{knowledge.content}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          )}

          {document.tags && document.tags.length > 0 && (
            <TabsContent value="metadata" className="flex-1 overflow-auto p-6 m-0">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </Card>
    </div>
  );
}
