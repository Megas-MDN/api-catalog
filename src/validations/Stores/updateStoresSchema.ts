import { z } from "zod";

export const updateStoresSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(190, "Name is too long")
    .optional(),
  email: z
    .string()
    .email("Invalid email")
    .min(1, "Email is required")
    .max(190, "Email is too long")
    .optional(),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(190, "Phone is too long")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(299, "Description is too long")
    .optional(),
  adress: z
    .string()
    .min(1, "Adress is required")
    .max(299, "Adress is too long")
    .optional(),
  coordinates: z
    .string()
    .min(1, "Coordinates is required")
    .max(299, "Coordinates is too long")
    .optional(),
  imageProfile: z
    .string()
    .min(1, "Image is required")
    .max(299, "Image is too long")
    .optional(),
  imageCoverProfile: z
    .string()
    .min(1, "Image is required")
    .max(299, "Image is too long")
    .optional(),
});

export type TUpdateStores = z.infer<typeof updateStoresSchema>;
