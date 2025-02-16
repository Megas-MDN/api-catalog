import { z } from "zod";

export const loginUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Email is required")
    .max(190, "Email is too long"),
  password: z
    .string()
    .min(1, "Password to short")
    .max(190, "Password is too long"),
});

export type TLoginUsers = z.infer<typeof loginUserSchema>;
