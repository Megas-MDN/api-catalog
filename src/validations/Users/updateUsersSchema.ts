import { z } from "zod";

export const updateUsersSchema = z.object({});

export type TUpdateUsers = z.infer<typeof updateUsersSchema>;
