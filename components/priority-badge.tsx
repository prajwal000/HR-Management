import type { Priority } from "@prisma/client";
import { cn } from "@/lib/utils";

const styles: Record<Priority, string> = {
  LOW: "bg-neutral-100 text-neutral-600",
  MEDIUM: "bg-blue-50 text-blue-700",
  HIGH: "bg-orange-50 text-orange-700",
  URGENT: "bg-red-50 text-red-700",
};

const labels: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        styles[priority]
      )}
    >
      {labels[priority]}
    </span>
  );
}
