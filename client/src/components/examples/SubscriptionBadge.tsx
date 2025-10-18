import { SubscriptionBadge } from "../subscription-badge";

export default function SubscriptionBadgeExample() {
  return (
    <div className="flex gap-2 p-4 flex-wrap">
      <SubscriptionBadge tier="free" />
      <SubscriptionBadge tier="pro-se" />
      <SubscriptionBadge tier="attorney" />
      <SubscriptionBadge tier="law-firm" />
    </div>
  );
}
