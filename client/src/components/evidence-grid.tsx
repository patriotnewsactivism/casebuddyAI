import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Image, Video, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Evidence {
  id: string;
  name: string;
  type: "document" | "image" | "video";
  classification: string;
  relevance: "high" | "medium" | "low";
  aiScore?: number;
}

interface EvidenceGridProps {
  evidence: Evidence[];
  className?: string;
}

const typeIcons = {
  document: FileText,
  image: Image,
  video: Video,
};

const relevanceColors = {
  high: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  medium: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  low: "bg-muted text-muted-foreground border-border",
};

export function EvidenceGrid({ evidence, className }: EvidenceGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)} data-testid="evidence-grid">
      {evidence.map((item) => {
        const Icon = typeIcons[item.type];
        return (
          <Card key={item.id} className="p-4 hover-elevate" data-testid={`evidence-${item.id}`}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`button-menu-${item.id}`}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <h4 className="font-medium text-sm mb-2 line-clamp-2">{item.name}</h4>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {item.classification}
              </Badge>
              <Badge variant="outline" className={cn("text-xs", relevanceColors[item.relevance])}>
                {item.relevance} relevance
              </Badge>
            </div>
            {item.aiScore && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.aiScore}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.aiScore}%</span>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
