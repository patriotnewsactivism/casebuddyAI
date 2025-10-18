import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsight {
  type: "success" | "warning" | "info";
  title: string;
  description: string;
  confidence: number;
}

interface AIInsightPanelProps {
  insights: AIInsight[];
  className?: string;
}

const typeConfig = {
  success: {
    icon: TrendingUp,
    className: "text-chart-2",
  },
  warning: {
    icon: AlertTriangle,
    className: "text-chart-3",
  },
  info: {
    icon: Info,
    className: "text-primary",
  },
};

export function AIInsightPanel({ insights, className }: AIInsightPanelProps) {
  return (
    <Card className={cn("border-primary/30", className)} data-testid="ai-insights-panel">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = typeConfig[insight.type].icon;
          return (
            <div
              key={index}
              className="flex gap-3 rounded-md border bg-card p-3"
              data-testid={`insight-${index}`}
            >
              <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", typeConfig[insight.type].className)} />
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" data-testid={`button-why-${index}`}>
                  Why?
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
