import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { Calendar, FileText, MoreVertical, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  id: string;
  title: string;
  caseNumber: string;
  status: "active" | "pending" | "closed" | "urgent";
  client: string;
  filingDate: string;
  documentCount: number;
  nextDeadline?: string;
  className?: string;
  onClick?: () => void;
}

export function CaseCard({
  id,
  title,
  caseNumber,
  status,
  client,
  filingDate,
  documentCount,
  nextDeadline,
  className,
  onClick,
}: CaseCardProps) {
  return (
    <Card 
      className={cn("hover-elevate cursor-pointer transition-all", className)}
      onClick={onClick}
      data-testid={`case-card-${id}`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold leading-none">{title}</h3>
            <StatusBadge status={status} />
          </div>
          <p className="text-sm font-mono text-muted-foreground">{caseNumber}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-case-menu-${id}`}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>{client}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span>{documentCount} docs</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Filed {filingDate}</span>
          </div>
          {nextDeadline && (
            <div className="text-sm font-medium text-destructive">
              Deadline: {nextDeadline}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
