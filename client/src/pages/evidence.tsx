import { EvidenceGrid } from "@/components/evidence-grid";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { Plus } from "lucide-react";
import { useState } from "react";

//todo: remove mock functionality
const mockEvidence = [
  {
    id: "1",
    name: "Employment Contract - Final Signed",
    type: "document" as const,
    classification: "Contract",
    relevance: "high" as const,
    aiScore: 94,
  },
  {
    id: "2",
    name: "Security Camera Footage - Incident",
    type: "video" as const,
    classification: "Video Evidence",
    relevance: "high" as const,
    aiScore: 88,
  },
  {
    id: "3",
    name: "Email Correspondence Thread",
    type: "document" as const,
    classification: "Communication",
    relevance: "medium" as const,
    aiScore: 72,
  },
  {
    id: "4",
    name: "Accident Scene Photos",
    type: "image" as const,
    classification: "Photographic",
    relevance: "high" as const,
    aiScore: 91,
  },
  {
    id: "5",
    name: "Financial Records Q1 2024",
    type: "document" as const,
    classification: "Financial",
    relevance: "medium" as const,
    aiScore: 68,
  },
  {
    id: "6",
    name: "Witness Interview Recording",
    type: "video" as const,
    classification: "Testimony",
    relevance: "high" as const,
    aiScore: 86,
  },
];

export default function Evidence() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvidence = mockEvidence.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.classification.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold">Evidence</h1>
          <p className="text-muted-foreground mt-1">
            AI-classified evidence with relevance scoring
          </p>
        </div>
        <Button data-testid="button-add-evidence">
          <Plus className="h-4 w-4 mr-2" />
          Add Evidence
        </Button>
      </div>

      <SearchBar
        placeholder="Search evidence..."
        onSearch={setSearchQuery}
        className="pl-10 max-w-xl"
      />

      <EvidenceGrid evidence={filteredEvidence} />
    </div>
  );
}
