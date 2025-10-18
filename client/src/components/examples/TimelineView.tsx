import { TimelineView } from "../timeline-view";

export default function TimelineViewExample() {
  const events = [
    {
      id: "1",
      date: "Jan 15, 2024",
      title: "Case Filed",
      description: "Initial complaint filed with court",
      status: "completed" as const,
      type: "Filing",
    },
    {
      id: "2",
      date: "Feb 1, 2024",
      title: "Discovery Deadline",
      description: "All discovery requests must be submitted",
      status: "upcoming" as const,
      type: "Deadline",
    },
    {
      id: "3",
      date: "Mar 15, 2024",
      title: "Motion Hearing",
      description: "Hearing on motion to dismiss",
      status: "pending" as const,
      type: "Hearing",
    },
  ];

  return (
    <div className="p-4 max-w-2xl">
      <TimelineView events={events} />
    </div>
  );
}
