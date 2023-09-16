import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { type Player } from "@prisma/client";
import { playerIdSchema } from "@/validation/player";

async function parsePlayer(player: Player) {
  return {
    id: player.id,
    currency: player.currency,
  };
}

export const playerRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ playerId: playerIdSchema }))
    .query(async ({ ctx, input }) => {
      const player = await ctx.db.player.findUnique({
        where: {
          id: input.playerId,
        },
      });

      if (!player) {
        return null;
      }

      return await parsePlayer(player);
    }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const player = await ctx.db.player.create({
      data: {
        id: ctx.auth.userId,
        currency: 0,
      },
    });

    return await parsePlayer(player);
  }),
});
