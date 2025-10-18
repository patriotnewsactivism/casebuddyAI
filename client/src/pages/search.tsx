import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Folder, Scale, Calendar } from "lucide-react";

//todo: remove mock functionality
const mockResults = [
  {
    id: "1",
    type: "case" as const,
    title: "Smith v. Johnson",
    description: "Active civil case regarding employment discrimination",
    metadata: "CV-2024-001234 • Filed Jan 15, 2024",
  },
  {
    id: "2",
    type: "document" as const,
    title: "Employment Contract Agreement",
    description: "Contract document containing relevant employment terms",
    metadata: "PDF • 2.4 MB • Uploaded Jan 20, 2024",
  },
  {
    id: "3",
    type: "evidence" as const,
    title: "Email Correspondence Thread",
    description: "Communication evidence classified as highly relevant",
    metadata: "94% AI confidence • High relevance",
  },
  {
    id: "4",
    type: "event" as const,
    title: "Motion to Dismiss Hearing",
    description: "Scheduled hearing for defendant's motion",
    metadata: "Feb 28, 2024 • 10:00 AM",
  },
];

const typeIcons = {
  case: Folder,
  document: FileText,
  evidence: Scale,
  event: Calendar,
};

const typeColors = {
  case: "bg-primary/20 text-primary border-primary/30",
  document: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  evidence: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  event: "bg-chart-4/20 text-chart-4 border-chart-4/30",
};

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = searchQuery
    ? mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Global Search</h1>
        <p className="text-muted-foreground mt-1">
          Search across all cases, documents, and evidence
        </p>
      </div>

      <SearchBar
        placeholder="Search everything..."
        onSearch={setSearchQuery}
        className="pl-10 max-w-2xl"
      />

      {searchQuery && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {filteredResults.length} results for "{searchQuery}"
          </p>
          {filteredResults.map((result) => {
            const Icon = typeIcons[result.type];
            return (
              <Card key={result.id} className="hover-elevate cursor-pointer" data-testid={`result-${result.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <CardTitle className="text-base">{result.title}</CardTitle>
                        <Badge variant="outline" className={typeColors[result.type]}>
                          {result.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">{result.metadata}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}

      {!searchQuery && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Enter a search query to find cases, documents, evidence, and more
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
