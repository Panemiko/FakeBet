import { z } from "zod";

export const roomCodeSchema = z.string().length(4).toUpperCase();
