import { requireAdmin } from "@/lib/dal";

export default async function EmployeesPage() {
  await requireAdmin();

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-900">Employees</h1>
      <p className="mt-2 text-sm text-neutral-500">Coming soon.</p>
    </div>
  );
}
