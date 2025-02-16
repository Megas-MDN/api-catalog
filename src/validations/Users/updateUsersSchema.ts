import { z } from "zod";

export const updateUsersSchema = z.object({
  name: z
    .string()
    .min(1, "Username is required")
    .max(190, "Username is too long")
    .optional(),
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Email is required")
    .max(190, "Email is too long")
    .optional(),
  password: z
    .string()
    .min(1, "Password to short")
    .max(190, "Password is too long")
    .optional(),
  imageProfile: z
    .string()
    .min(1, "Image is required")
    .max(299, "Image is too long")
    .optional(),
  isFromGoogle: z.boolean().optional(),
});

export type TUpdateUsers = z.infer<typeof updateUsersSchema>;
