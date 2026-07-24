import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }),
  password: z.string().min(1, { error: "Password is required." }),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
