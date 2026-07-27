"use client";

import { useTransition } from "react";
import type { Role } from "@prisma/client";
import { setEmployeeActive, updateEmployeeRole } from "@/app/actions/employees";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export function EmployeeRowActions({
  userId,
  role,
  active,
  isSelf,
}: {
  userId: string;
  role: Role;
  active: boolean;
  isSelf: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  if (isSelf) {
    return <span className="text-xs text-neutral-400">You</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        defaultValue={role}
        disabled={isPending}
        className="w-auto py-1"
        onChange={(e) => {
          const value = e.target.value as Role;
          startTransition(() => {
            updateEmployeeRole(userId, value);
          });
        }}
      >
        <option value="ADMIN">Admin</option>
        <option value="HR">HR</option>
        <option value="EMPLOYEE">Employee</option>
      </Select>

      <Button
        type="button"
        variant={active ? "secondary" : "primary"}
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            setEmployeeActive(userId, !active);
          });
        }}
      >
        {active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
