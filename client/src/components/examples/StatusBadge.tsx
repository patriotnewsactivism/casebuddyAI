import { StatusBadge } from "../status-badge";

export default function StatusBadgeExample() {
  return (
    <div className="flex gap-2 p-4 flex-wrap">
      <StatusBadge status="active" />
      <StatusBadge status="pending" />
      <StatusBadge status="closed" />
      <StatusBadge status="urgent" />
    </div>
  );
}
