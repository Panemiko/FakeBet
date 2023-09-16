import { z } from "zod";

export const modelIdSchema = z.string().uuid();
