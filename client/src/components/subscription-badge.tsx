import { Badge } from "@/components/ui/badge";
import { Crown, User, Users, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SubscriptionTier = "free" | "pro-se" | "attorney" | "law-firm";

interface SubscriptionBadgeProps {
  tier: SubscriptionTier;
  className?: string;
}

const tierConfig = {
  free: {
    label: "Free",
    icon: User,
    className: "bg-muted text-muted-foreground border-border",
  },
  "pro-se": {
    label: "Pro Se",
    icon: User,
    className: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  },
  attorney: {
    label: "Attorney",
    icon: Crown,
    className: "bg-primary/20 text-primary border-primary/30",
  },
  "law-firm": {
    label: "Law Firm",
    icon: Building2,
    className: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  },
};

export function SubscriptionBadge({ tier, className }: SubscriptionBadgeProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;
  
  return (
    <Badge 
      variant="outline" 
      className={cn("gap-1", config.className, className)}
      data-testid={`subscription-${tier}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
