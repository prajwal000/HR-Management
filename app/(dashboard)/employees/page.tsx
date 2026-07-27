import { requireAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { CreateEmployeeForm } from "./create-employee-form";
import { EmployeeRowActions } from "./employee-row-actions";
import { cn } from "@/lib/utils";

export default async function EmployeesPage() {
  const admin = await requireAdmin();

  const employees = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      department: true,
      active: true,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-neutral-900">Employees</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Create accounts and manage roles. New employees receive their
          login credentials by email.
        </p>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-neutral-900">
          New employee
        </h2>
        <CreateEmployeeForm />
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <table className="min-w-full divide-y divide-neutral-200 text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Department</Th>
              <Th>Status</Th>
              <Th>Role</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <Td className="font-medium text-neutral-900">
                  {employee.name}
                </Td>
                <Td>{employee.email}</Td>
                <Td>{employee.department ?? "—"}</Td>
                <Td>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                      employee.active
                        ? "bg-green-50 text-green-700"
                        : "bg-neutral-100 text-neutral-500"
                    )}
                  >
                    {employee.active ? "Active" : "Inactive"}
                  </span>
                </Td>
                <Td>
                  <EmployeeRowActions
                    userId={employee.id}
                    role={employee.role}
                    active={employee.active}
                    isSelf={employee.id === admin.id}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-neutral-500">
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={cn("px-4 py-3 text-neutral-700", className)}>{children}</td>;
}
