import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "active" | "pending" | "closed" | "urgent";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  },
  pending: {
    label: "Pending",
    className: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  },
  closed: {
    label: "Closed",
    className: "bg-muted text-muted-foreground border-border",
  },
  urgent: {
    label: "Urgent",
    className: "bg-destructive/20 text-destructive border-destructive/30",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(config.className, className)}
      data-testid={`status-${status}`}
    >
      {config.label}
    </Badge>
  );
}
