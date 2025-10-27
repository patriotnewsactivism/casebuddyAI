import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, FileText, Download, Wand2, Brain, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GeneratePage() {
  const { toast } = useToast();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [context, setContext] = useState("");
  const [useKnowledgeBase, setUseKnowledgeBase] = useState(true);
  const [tone, setTone] = useState<"formal" | "professional" | "casual">("formal");
  const [generatedContent, setGeneratedContent] = useState("");
  const [improvementInstructions, setImprovementInstructions] = useState("");

  // Fetch templates
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ["/api/templates"],
  });

  // Fetch generated documents
  const { data: generatedDocs = [], refetch: refetchGenerated } = useQuery({
    queryKey: ["/api/generated"],
  });

  // Fetch knowledge base
  const { data: knowledge = [] } = useQuery({
    queryKey: ["/api/knowledge"],
  });

  // Generate document mutation
  const generateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Generation failed");
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedContent(data.content);
      refetchGenerated();
      toast({
        title: "Document Generated",
        description: `Generated with ${data.confidence}% confidence`,
      });
    },
    onError: () => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Improve document mutation
  const improveMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Improvement failed");
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedContent(data.content);
      toast({
        title: "Document Improved",
        description: "Your document has been enhanced.",
      });
    },
  });

  const selectedTemplate = templates.find((t: any) => t.id === selectedTemplateId);
  
  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter((t: any) => t.category === selectedCategory);

  const categories = ["all", ...new Set(templates.map((t: any) => t.category))];

  const handleGenerate = () => {
    if (!selectedTemplateId) {
      toast({
        title: "No Template Selected",
        description: "Please select a template to generate a document.",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate({
      templateId: selectedTemplateId,
      variables,
      context,
      useKnowledgeBase,
      tone,
    });
  };

  const handleImprove = () => {
    if (!generatedContent) {
      toast({
        title: "No Content",
        description: "Generate a document first before improving it.",
        variant: "destructive",
      });
      return;
    }

    improveMutation.mutate({
      content: generatedContent,
      instructions: improvementInstructions,
      documentType: selectedTemplate?.category,
    });
  };

  const handleVariableChange = (key: string, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  const downloadDocument = () => {
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTemplate?.name || "document"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (templatesLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">AI Document Generator</h1>
        <p className="text-muted-foreground mt-1">
          Generate professional legal documents using AI and your knowledge base
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="text-xs text-muted-foreground">Available templates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated</CardTitle>
            <Wand2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{generatedDocs.length}</div>
            <p className="text-xs text-muted-foreground">Documents created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Knowledge</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{knowledge.length}</div>
            <p className="text-xs text-muted-foreground">Concepts learned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Generate New</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>1. Select Template</CardTitle>
                <CardDescription>Choose a legal document template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat === "all" ? "All Templates" : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  {filteredTemplates.map((template: any) => (
                    <div
                      key={template.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedTemplateId === template.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedTemplateId(template.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Variables & Settings */}
            <Card>
              <CardHeader>
                <CardTitle>2. Configure Details</CardTitle>
                <CardDescription>Fill in document variables and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTemplate && selectedTemplate.variables && selectedTemplate.variables.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Required Variables:</h4>
                    <div className="max-h-[300px] overflow-y-auto space-y-3">
                      {selectedTemplate.variables.map((variable: string) => (
                        <div key={variable}>
                          <Label htmlFor={variable} className="text-sm">
                            {variable.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Label>
                          <Input
                            id={variable}
                            placeholder={`Enter ${variable.replace(/_/g, " ")}`}
                            value={variables[variable] || ""}
                            onChange={(e) => handleVariableChange(variable, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Select a template to see required variables</p>
                  </div>
                )}

                <div>
                  <Label htmlFor="context">Additional Context (Optional)</Label>
                  <Textarea
                    id="context"
                    placeholder="Provide any additional context or specific requirements..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="knowledge">Use Knowledge Base</Label>
                      <p className="text-xs text-muted-foreground">
                        Incorporate learned legal concepts
                      </p>
                    </div>
                    <Switch
                      id="knowledge"
                      checked={useKnowledgeBase}
                      onCheckedChange={setUseKnowledgeBase}
                    />
                  </div>

                  <div>
                    <Label>Document Tone</Label>
                    <Select value={tone} onValueChange={(v: any) => setTone(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={!selectedTemplateId || generateMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {generateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generate Document
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Document */}
          {generatedContent && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Document</CardTitle>
                    <CardDescription>Review and refine your document</CardDescription>
                  </div>
                  <Button onClick={downloadDocument} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={generatedContent}
                  onChange={(e) => setGeneratedContent(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />

                <div className="space-y-3 pt-4 border-t">
                  <Label>Improvement Instructions</Label>
                  <Textarea
                    placeholder="E.g., 'Make it more concise', 'Add more detail about...' "
                    value={improvementInstructions}
                    onChange={(e) => setImprovementInstructions(e.target.value)}
                    rows={3}
                  />
                  <Button
                    onClick={handleImprove}
                    disabled={improveMutation.isPending}
                    variant="secondary"
                  >
                    {improveMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Improving...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Improve Document
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Documents History</CardTitle>
              <CardDescription>Previously generated documents</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedDocs.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">No documents generated yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {generatedDocs.map((doc: any) => (
                    <div key={doc.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Created {new Date(doc.createdAt).toLocaleDateString()}
                          </p>
                          {doc.confidence && (
                            <Badge variant="outline" className="mt-2">
                              {doc.confidence}% Confidence
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setGeneratedContent(doc.content);
                            toast({
                              title: "Document Loaded",
                              description: "Document loaded into editor",
                            });
                          }}
                        >
                          Load
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Legal Knowledge Base</CardTitle>
              <CardDescription>
                Concepts and precedents learned from your documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {knowledge.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground mb-2">
                    No knowledge base entries yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Upload legal documents to build your knowledge base
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {knowledge.map((item: any) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{item.legalConcept}</h4>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.content}</p>
                      {item.relevanceScore && (
                        <div className="mt-2">
                          <Badge variant="outline">
                            Relevance: {item.relevanceScore}%
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
