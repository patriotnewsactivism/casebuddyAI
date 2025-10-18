import { CaseCard } from "../case-card";

export default function CaseCardExample() {
  return (
    <div className="p-4 max-w-md">
      <CaseCard
        id="1"
        title="Smith v. Johnson"
        caseNumber="CV-2024-001234"
        status="active"
        client="John Smith"
        filingDate="Jan 15, 2024"
        documentCount={24}
        nextDeadline="Feb 28, 2024"
        onClick={() => console.log("Case clicked")}
      />
    </div>
  );
}
