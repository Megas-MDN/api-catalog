import { z } from "zod";

export const updateStoresSchema = z.object({});

export type TUpdateStores = z.infer<typeof updateStoresSchema>;
