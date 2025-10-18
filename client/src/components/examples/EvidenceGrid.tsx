import { EvidenceGrid } from "../evidence-grid";

export default function EvidenceGridExample() {
  const evidence = [
    {
      id: "1",
      name: "Contract Agreement.pdf",
      type: "document" as const,
      classification: "Contract",
      relevance: "high" as const,
      aiScore: 94,
    },
    {
      id: "2",
      name: "Security Footage",
      type: "video" as const,
      classification: "Video Evidence",
      relevance: "high" as const,
      aiScore: 88,
    },
    {
      id: "3",
      name: "Email Correspondence",
      type: "document" as const,
      classification: "Communication",
      relevance: "medium" as const,
      aiScore: 72,
    },
  ];

  return (
    <div className="p-4">
      <EvidenceGrid evidence={evidence} />
    </div>
  );
}
