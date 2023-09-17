import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { type Player } from "@prisma/client";
import { playerIdSchema } from "@/validation/player";
import { modelIdSchema } from "@/validation/global";

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
  byCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const player = await ctx.db.player.findUnique({
      where: {
        id: ctx.auth.userId,
      },
    });

    return player!;
  }),
  byRoom: protectedProcedure
    .input(z.object({ roomId: modelIdSchema }))
    .query(async ({ ctx, input }) => {
      const room = await ctx.db.room.findUnique({
        where: {
          id: input.roomId,
        },
      });

      if (!room) {
        return null;
      }

      const players = await ctx.db.player.findMany({
        where: {
          entrances: {
            some: {
              roomId: room.id,
            },
          },
        },
      });

      const sanitizedPlayers = Promise.all(players.map(parsePlayer));

      return sanitizedPlayers;
    }),
});
