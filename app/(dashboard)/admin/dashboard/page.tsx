import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const user = await requireAdmin();

  const [employeeCount, taskCount, openTaskCount] = await Promise.all([
    prisma.user.count({ where: { active: true } }),
    prisma.task.count(),
    prisma.task.count({ where: { status: { not: "DONE" } } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="text-sm text-neutral-500">Organization overview.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Active employees" value={employeeCount} />
        <StatCard label="Total tasks" value={taskCount} />
        <StatCard label="Open tasks" value={openTaskCount} />
      </div>

      <div className="flex gap-3">
        <Link
          href="/employees"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Manage employees
        </Link>
        <Link
          href="/tasks"
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
        >
          View all tasks
        </Link>
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
