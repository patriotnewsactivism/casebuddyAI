import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubscriptionBadge } from "@/components/subscription-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { User, Bell, Shield, CreditCard } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-semibold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-profile">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Sarah Johnson" data-testid="input-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="sarah.johnson@lawfirm.com" data-testid="input-email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firm">Law Firm</Label>
              <Input id="firm" defaultValue="Johnson & Associates" data-testid="input-firm" />
            </div>
            <Button data-testid="button-save-profile">Save Changes</Button>
          </CardContent>
        </Card>

        <Card data-testid="card-subscription">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Plan</span>
              <SubscriptionBadge tier="attorney" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                You have access to all AI features, unlimited document analysis, and advanced legal research.
              </p>
              <p className="text-sm font-medium">$99/month</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" data-testid="button-manage-subscription">Manage Subscription</Button>
              <Button data-testid="button-upgrade">Upgrade Plan</Button>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-notifications">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Deadline Reminders</p>
                <p className="text-xs text-muted-foreground">Get notified about upcoming deadlines</p>
              </div>
              <Button variant="outline" size="sm" data-testid="toggle-deadlines">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">AI Insights</p>
                <p className="text-xs text-muted-foreground">Receive AI-generated case insights</p>
              </div>
              <Button variant="outline" size="sm" data-testid="toggle-insights">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Document Updates</p>
                <p className="text-xs text-muted-foreground">Alerts when documents are added</p>
              </div>
              <Button variant="outline" size="sm" data-testid="toggle-documents">Disabled</Button>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-appearance">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Theme</p>
                <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
