import { CaseHeader } from "../case-header";

export default function CaseHeaderExample() {
  return (
    <div className="p-4">
      <CaseHeader
        caseNumber="CV-2024-001234"
        title="Smith v. Johnson"
        status="active"
        filingDate="Jan 15, 2024"
        courtDate="Mar 20, 2024"
        documentCount={24}
      />
    </div>
  );
}
