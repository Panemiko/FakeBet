import { z } from "zod";

export const userIdSchema = z.string().startsWith("user_");
