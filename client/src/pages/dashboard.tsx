import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseCard } from "@/components/case-card";
import { AIInsightPanel } from "@/components/ai-insight-panel";
import { SubscriptionBadge } from "@/components/subscription-badge";
import { TrendingUp, FileText, Scale, Clock } from "lucide-react";
import { useLocation } from "wouter";

//todo: remove mock functionality
const mockCases = [
  {
    id: "1",
    title: "Smith v. Johnson",
    caseNumber: "CV-2024-001234",
    status: "active" as const,
    client: "John Smith",
    filingDate: "Jan 15, 2024",
    documentCount: 24,
    nextDeadline: "Feb 28, 2024",
  },
  {
    id: "2",
    title: "Estate of Williams",
    caseNumber: "PR-2024-005678",
    status: "pending" as const,
    client: "Williams Family",
    filingDate: "Feb 1, 2024",
    documentCount: 12,
  },
  {
    id: "3",
    title: "Rodriguez Employment Case",
    caseNumber: "EM-2024-009876",
    status: "urgent" as const,
    client: "Maria Rodriguez",
    filingDate: "Jan 28, 2024",
    documentCount: 18,
    nextDeadline: "Feb 15, 2024",
  },
];

const mockInsights = [
  {
    type: "success" as const,
    title: "Strong Precedent Found",
    description: "Similar case in 9th Circuit supports your position on motion to dismiss.",
    confidence: 92,
  },
  {
    type: "warning" as const,
    title: "Upcoming Deadline",
    description: "Discovery requests for Rodriguez case due in 5 days.",
    confidence: 100,
  },
];

const stats = [
  { label: "Active Cases", value: "12", icon: Scale, color: "text-primary" },
  { label: "Documents", value: "247", icon: FileText, color: "text-chart-2" },
  { label: "Pending Deadlines", value: "8", icon: Clock, color: "text-chart-3" },
  { label: "This Month", value: "+23%", icon: TrendingUp, color: "text-chart-2" },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to Case Buddy</p>
        </div>
        <SubscriptionBadge tier="attorney" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Recent Cases</h2>
          <div className="grid gap-4">
            {mockCases.map((caseData) => (
              <CaseCard
                key={caseData.id}
                {...caseData}
                onClick={() => setLocation(`/cases/${caseData.id}`)}
              />
            ))}
          </div>
        </div>
        <div>
          <AIInsightPanel insights={mockInsights} />
        </div>
      </div>
    </div>
  );
}
