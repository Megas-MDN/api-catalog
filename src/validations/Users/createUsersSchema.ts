import { z } from "zod";

export const createUsersSchema = z.object({});

export type TCreateUsers = z.infer<typeof createUsersSchema>;
