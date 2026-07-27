"use client";

import { useActionState, useEffect, useRef } from "react";
import { createEmployee } from "@/app/actions/employees";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export function CreateEmployeeForm() {
  const [state, action, pending] = useActionState(createEmployee, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Jane Doe" required />
          {state?.errors?.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@company.com"
            required
          />
          {state?.errors?.email && (
            <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select id="role" name="role" defaultValue="EMPLOYEE" required>
            <option value="ADMIN">Admin</option>
            <option value="HR">HR</option>
            <option value="EMPLOYEE">Employee</option>
          </Select>
          {state?.errors?.role && (
            <p className="mt-1 text-sm text-red-600">{state.errors.role[0]}</p>
          )}
        </div>

        <div>
          <Label htmlFor="department">Department (optional)</Label>
          <Input id="department" name="department" placeholder="Engineering" />
        </div>
      </div>

      {state?.message && !state.errors && (
        <p className={state.success ? "text-sm text-green-700" : "text-sm text-red-600"}>
          {state.message}
        </p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create employee"}
      </Button>
    </form>
  );
}
