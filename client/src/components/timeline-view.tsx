import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "completed" | "upcoming" | "pending";
  type?: string;
}

interface TimelineViewProps {
  events: TimelineEvent[];
  className?: string;
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    className: "text-chart-2",
  },
  upcoming: {
    icon: Clock,
    className: "text-chart-3",
  },
  pending: {
    icon: Circle,
    className: "text-muted-foreground",
  },
};

export function TimelineView({ events, className }: TimelineViewProps) {
  return (
    <Card className={className} data-testid="timeline-view">
      <CardHeader>
        <CardTitle>Case Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6">
          <div className="absolute left-[17px] top-2 bottom-2 w-px bg-border" />
          {events.map((event, index) => {
            const Icon = statusConfig[event.status].icon;
            return (
              <div key={event.id} className="relative flex gap-4" data-testid={`timeline-event-${event.id}`}>
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background border-2 border-border">
                  <Icon className={cn("h-5 w-5", statusConfig[event.status].className)} />
                </div>
                <div className="flex-1 space-y-1 pb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium">{event.title}</p>
                    {event.type && (
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
