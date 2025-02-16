import { z } from "zod";

export const createStoresSchema = z.object({});

export type TCreateStores = z.infer<typeof createStoresSchema>;
