import { getCurrentUser } from "@/lib/dal";
import { logout } from "@/app/actions/auth";
import { SidebarNav } from "@/components/sidebar-nav";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  const navItems = [
    { href: user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
    ...(user.role === "ADMIN"
      ? [{ href: "/employees", label: "Employees" }]
      : []),
    { href: "/profile", label: "Profile" },
  ];

  return (
    <div className="flex min-h-screen flex-1">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-neutral-200 bg-white py-6 sm:flex">
        <div className="mb-8 px-4">
          <span className="text-lg font-semibold text-neutral-900">
            HR Manager
          </span>
        </div>
        <SidebarNav items={navItems} />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 sm:px-6">
          <div className="sm:hidden text-sm font-semibold">HR Manager</div>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-neutral-900">
                {user.name}
              </p>
              <p className="text-xs text-neutral-500">{user.role}</p>
            </div>
            <form action={logout}>
              <Button variant="secondary" type="submit">
                Log out
              </Button>
            </form>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
