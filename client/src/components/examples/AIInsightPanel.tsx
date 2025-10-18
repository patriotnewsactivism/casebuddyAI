import { AIInsightPanel } from "../ai-insight-panel";

export default function AIInsightPanelExample() {
  const insights = [
    {
      type: "success" as const,
      title: "Strong Precedent Found",
      description: "Similar case in 9th Circuit supports your position on motion to dismiss.",
      confidence: 92,
    },
    {
      type: "warning" as const,
      title: "Missing Evidence",
      description: "Consider obtaining expert testimony to strengthen claim #3.",
      confidence: 78,
    },
    {
      type: "info" as const,
      title: "Timeline Prediction",
      description: "Based on historical data, expect summary judgment ruling in 45-60 days.",
      confidence: 85,
    },
  ];

  return (
    <div className="p-4 max-w-2xl">
      <AIInsightPanel insights={insights} />
    </div>
  );
}
