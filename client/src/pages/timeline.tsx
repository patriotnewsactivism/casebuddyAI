import { TimelineView } from "@/components/timeline-view";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

//todo: remove mock functionality
const mockEvents = [
  {
    id: "1",
    date: "Jan 15, 2024",
    title: "Case Filed",
    description: "Initial complaint filed with Superior Court",
    status: "completed" as const,
    type: "Filing",
  },
  {
    id: "2",
    date: "Jan 22, 2024",
    title: "Defendant Served",
    description: "Service of process completed for all defendants",
    status: "completed" as const,
    type: "Service",
  },
  {
    id: "3",
    date: "Feb 1, 2024",
    title: "Discovery Phase Begins",
    description: "All discovery requests must be submitted by this date",
    status: "upcoming" as const,
    type: "Deadline",
  },
  {
    id: "4",
    date: "Feb 15, 2024",
    title: "Initial Discovery Due",
    description: "First round of document production and interrogatories due",
    status: "upcoming" as const,
    type: "Deadline",
  },
  {
    id: "5",
    date: "Feb 28, 2024",
    title: "Motion to Dismiss Hearing",
    description: "Oral arguments on defendant's motion to dismiss",
    status: "upcoming" as const,
    type: "Hearing",
  },
  {
    id: "6",
    date: "Mar 10, 2024",
    title: "Expert Witness Designation",
    description: "Deadline to designate expert witnesses",
    status: "pending" as const,
    type: "Deadline",
  },
  {
    id: "7",
    date: "Mar 20, 2024",
    title: "Trial Date",
    description: "Scheduled trial date - jury selection begins at 9:00 AM",
    status: "pending" as const,
    type: "Trial",
  },
];

export default function Timeline() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold">Case Timeline</h1>
          <p className="text-muted-foreground mt-1">
            Track all case events and deadlines
          </p>
        </div>
        <Button data-testid="button-add-event">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <TimelineView events={mockEvents} />
    </div>
  );
}
