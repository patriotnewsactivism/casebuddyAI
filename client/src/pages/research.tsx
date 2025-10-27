import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Brain, BookOpen, Sparkles, FileSearch, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Research() {
  const [query, setQuery] = useState("");
  const [researchResults, setResearchResults] = useState<any>(null);
  const { toast } = useToast();

  const { data: knowledge = [] } = useQuery({
    queryKey: ["/api/knowledge"],
  });

  const researchMutation = useMutation({
    mutationFn: async (searchQuery: string) => {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      if (!response.ok) throw new Error("Research failed");
      return response.json();
    },
    onSuccess: (data) => {
      setResearchResults(data);
      toast({
        title: "Research Complete",
        description: "AI has analyzed your query and compiled findings.",
      });
    },
    onError: () => {
      toast({
        title: "Research Failed",
        description: "Failed to perform research. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleResearch = () => {
    if (!query.trim()) {
      toast({
        title: "Enter a Query",
        description: "Please enter a research question or topic.",
        variant: "destructive",
      });
      return;
    }
    researchMutation.mutate(query);
  };

  const categories = [...new Set(knowledge.map((k: any) => k.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">AI Legal Research</h1>
        <p className="text-muted-foreground mt-1">
          Perform AI-powered legal research using your knowledge base
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data-testid="feature-analysis">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileSearch className="h-5 w-5 text-primary" />
              Document Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              AI-powered analysis of legal documents with entity extraction and concept identification
            </p>
          </CardContent>
        </Card>

        <Card data-testid="feature-citations">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-5 w-5 text-primary" />
              Knowledge Base
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{knowledge.length}</div>
            <p className="text-sm text-muted-foreground">
              Legal concepts learned from your documents
            </p>
          </CardContent>
        </Card>

        <Card data-testid="feature-precedent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Scale className="h-5 w-5 text-primary" />
              AI Research
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Synthesize knowledge and generate comprehensive research findings
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Research Query
          </CardTitle>
          <CardDescription>
            Ask a legal question and AI will search your knowledge base and provide comprehensive findings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="E.g., 'What are the key elements of a valid contract?' or 'Explain the statute of limitations for breach of contract'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-32"
            data-testid="input-research-query"
          />
          <Button
            onClick={handleResearch}
            disabled={researchMutation.isPending}
            className="w-full"
            size="lg"
            data-testid="button-search-research"
          >
            {researchMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Researching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Perform AI Research
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {researchResults && (
        <Card>
          <CardHeader>
            <CardTitle>Research Findings</CardTitle>
            <CardDescription>AI-generated research based on your knowledge base</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Summary</h3>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="whitespace-pre-wrap">{researchResults.findings}</p>
              </div>
            </div>

            {researchResults.relevantConcepts && researchResults.relevantConcepts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Relevant Legal Concepts</h3>
                <div className="flex flex-wrap gap-2">
                  {researchResults.relevantConcepts.map((concept: string, idx: number) => (
                    <Badge key={idx}>{concept}</Badge>
                  ))}
                </div>
              </div>
            )}

            {researchResults.sources && researchResults.sources.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Sources</h3>
                <ul className="space-y-1">
                  {researchResults.sources.map((source: string, idx: number) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Browse Knowledge Base</CardTitle>
          <CardDescription>Explore concepts learned from your documents</CardDescription>
        </CardHeader>
        <CardContent>
          {knowledge.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p className="text-muted-foreground mb-2">No knowledge base entries yet</p>
              <p className="text-sm text-muted-foreground">
                Upload legal documents to build your knowledge base
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {categories.map((category) => {
                const categoryKnowledge = knowledge.filter((k: any) => k.category === category);
                return (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Badge variant="outline">{category}</Badge>
                      <span className="text-sm text-muted-foreground">
                        ({categoryKnowledge.length} concepts)
                      </span>
                    </h3>
                    <div className="space-y-3">
                      {categoryKnowledge.slice(0, 5).map((item: any) => (
                        <Card key={item.id}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">{item.legalConcept}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">{item.content}</p>
                            {item.relevanceScore && (
                              <div className="mt-2">
                                <Badge variant="secondary">
                                  Relevance: {item.relevanceScore}%
                                </Badge>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                      {categoryKnowledge.length > 5 && (
                        <p className="text-sm text-muted-foreground text-center">
                          And {categoryKnowledge.length - 5} more concepts...
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
