import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Scale, FileSearch } from "lucide-react";

//todo: remove mock functionality
const mockCitations = [
  {
    id: "1",
    case: "Brown v. Board of Education",
    citation: "347 U.S. 483 (1954)",
    relevance: 95,
    summary: "Landmark case establishing that racial segregation in public schools is unconstitutional.",
    jurisdiction: "U.S. Supreme Court",
  },
  {
    id: "2",
    case: "Miranda v. Arizona",
    citation: "384 U.S. 436 (1966)",
    relevance: 88,
    summary: "Established the requirement for police to inform suspects of their rights.",
    jurisdiction: "U.S. Supreme Court",
  },
  {
    id: "3",
    case: "Smith v. Johnson (9th Cir.)",
    citation: "742 F.3d 889 (2014)",
    relevance: 92,
    summary: "Circuit court ruling on similar employment discrimination claims.",
    jurisdiction: "9th Circuit",
  },
];

export default function Research() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    console.log("AI Research query:", query);
    setTimeout(() => setIsSearching(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">AI Legal Research</h1>
        <p className="text-muted-foreground mt-1">
          Get AI-powered legal research and case citations
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
              AI-powered analysis of legal documents with entity extraction and risk assessment
            </p>
          </CardContent>
        </Card>

        <Card data-testid="feature-citations">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-5 w-5 text-primary" />
              Case Citations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Find relevant case law and precedents across all jurisdictions
            </p>
          </CardContent>
        </Card>

        <Card data-testid="feature-precedent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Scale className="h-5 w-5 text-primary" />
              Precedent Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Analyze how precedents apply to your specific case circumstances
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
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your legal research question or paste relevant text..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-32"
            data-testid="input-research-query"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isSearching || !query}
            data-testid="button-search-research"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isSearching ? "Analyzing..." : "Search Legal Database"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Relevant Cases</h2>
        {mockCitations.map((citation) => (
          <Card key={citation.id} className="hover-elevate" data-testid={`citation-${citation.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{citation.case}</CardTitle>
                  <p className="text-sm font-mono text-muted-foreground">{citation.citation}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{citation.jurisdiction}</Badge>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {citation.relevance}% match
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{citation.summary}</p>
              <Button variant="ghost" size="sm" className="mt-3" data-testid={`button-read-${citation.id}`}>
                Read Full Opinion
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
