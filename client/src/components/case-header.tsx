import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Calendar, FileText, Share2, Star } from "lucide-react";

interface CaseHeaderProps {
  caseNumber: string;
  title: string;
  status: "active" | "pending" | "closed" | "urgent";
  filingDate: string;
  courtDate?: string;
  documentCount: number;
}

export function CaseHeader({
  caseNumber,
  title,
  status,
  filingDate,
  courtDate,
  documentCount,
}: CaseHeaderProps) {
  return (
    <div className="space-y-4" data-testid="case-header">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-serif font-semibold">{title}</h1>
            <StatusBadge status={status} />
          </div>
          <p className="text-lg font-mono text-muted-foreground">{caseNumber}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" data-testid="button-favorite">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" data-testid="button-share">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button data-testid="button-add-document">
            <FileText className="h-4 w-4 mr-2" />
            Add Document
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Filed: {filingDate}</span>
        </div>
        {courtDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Court Date: {courtDate}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>{documentCount} Documents</span>
        </div>
      </div>
    </div>
  );
}
