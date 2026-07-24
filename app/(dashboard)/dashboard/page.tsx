import { getCurrentUser } from "@/lib/dal";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  const [assignedToMe, assignedByMe] = await Promise.all([
    prisma.task.count({ where: { assignedToId: user.id } }),
    prisma.task.count({ where: { createdById: user.id } }),
  ]);

  const openAssignedToMe = await prisma.task.count({
    where: { assignedToId: user.id, status: { not: "DONE" } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="text-sm text-neutral-500">
          Here&apos;s a quick look at your work.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Assigned to me" value={assignedToMe} />
        <StatCard label="Open (assigned to me)" value={openAssignedToMe} />
        <StatCard label="Created by me" value={assignedByMe} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-neutral-900">{value}</p>
    </div>
  );
}
