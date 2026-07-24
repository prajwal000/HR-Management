import type { Status } from "@prisma/client";
import { cn } from "@/lib/utils";

const styles: Record<Status, string> = {
  TODO: "bg-neutral-100 text-neutral-600",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  DONE: "bg-green-50 text-green-700",
};

const labels: Record<Status, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
}
