"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
};

export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/dashboard" &&
            item.href !== "/admin/dashboard" &&
            pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-neutral-900 text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
