import * as z from "zod";

export const CreateEmployeeSchema = z.object({
  name: z.string().trim().min(2, { error: "Name must be at least 2 characters." }),
  email: z.email({ error: "Enter a valid email address." }),
  role: z.enum(["ADMIN", "HR", "EMPLOYEE"], { error: "Select a role." }),
  department: z.string().trim().optional(),
});

export type CreateEmployeeFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        role?: string[];
        department?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
