import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CaseCard } from "@/components/case-card";
import { SearchBar } from "@/components/search-bar";
import { Plus } from "lucide-react";
import { useLocation } from "wouter";

//todo: remove mock functionality
const mockCases = [
  {
    id: "1",
    title: "Smith v. Johnson",
    caseNumber: "CV-2024-001234",
    status: "active" as const,
    client: "John Smith",
    filingDate: "Jan 15, 2024",
    documentCount: 24,
    nextDeadline: "Feb 28, 2024",
  },
  {
    id: "2",
    title: "Estate of Williams",
    caseNumber: "PR-2024-005678",
    status: "pending" as const,
    client: "Williams Family",
    filingDate: "Feb 1, 2024",
    documentCount: 12,
  },
  {
    id: "3",
    title: "Rodriguez Employment Case",
    caseNumber: "EM-2024-009876",
    status: "urgent" as const,
    client: "Maria Rodriguez",
    filingDate: "Jan 28, 2024",
    documentCount: 18,
    nextDeadline: "Feb 15, 2024",
  },
  {
    id: "4",
    title: "Thompson Contract Dispute",
    caseNumber: "CC-2024-002468",
    status: "active" as const,
    client: "Thompson Industries",
    filingDate: "Jan 10, 2024",
    documentCount: 31,
    nextDeadline: "Mar 5, 2024",
  },
  {
    id: "5",
    title: "Garcia v. State",
    caseNumber: "CR-2024-007890",
    status: "closed" as const,
    client: "Carlos Garcia",
    filingDate: "Dec 1, 2023",
    documentCount: 45,
  },
];

export default function Cases() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const filteredCases = mockCases.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold">Cases</h1>
          <p className="text-muted-foreground mt-1">Manage all your legal cases</p>
        </div>
        <Button data-testid="button-new-case">
          <Plus className="h-4 w-4 mr-2" />
          New Case
        </Button>
      </div>

      <SearchBar
        placeholder="Search cases..."
        onSearch={setSearchQuery}
        className="pl-10 max-w-xl"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map((caseData) => (
          <CaseCard
            key={caseData.id}
            {...caseData}
            onClick={() => setLocation(`/cases/${caseData.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
