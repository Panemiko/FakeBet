import { type Room } from "@prisma/client";
import { generateRoomCode } from "../lib/create-room-code";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { roomCodeSchema } from "@/validation/room";
import { TRPCError } from "@trpc/server";
import { pusherServer } from "../lib/pusher";
import { genPusherChannel } from "@/lib/pusher-key";

async function parseRoom(room: Room) {
  return {
    id: room.id,
    code: room.code,
  };
}

export const roomRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const room = await ctx.db.room.create({
      data: {
        code: await generateRoomCode(),
      },
    });

    return await parseRoom(room);
  }),
  join: protectedProcedure
    .input(z.object({ roomCode: roomCodeSchema }))
    .mutation(async ({ ctx, input }) => {
      const room = await ctx.db.room.findUnique({
        where: {
          code: input.roomCode,
        },
      });

      const player = await ctx.db.player.findUnique({
        where: {
          id: ctx.auth.userId,
        },
      });

      if (!room || !player) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await ctx.db.playerEntrance.create({
        data: { playerId: player.id, roomId: room.id },
      });

      await pusherServer.trigger(
        genPusherChannel("room", room.id),
        "player-join",
        { playerId: player?.id },
      );

      return await parseRoom(room);
    }),
  byCode: protectedProcedure
    .input(z.object({ roomCode: roomCodeSchema }))
    .query(async ({ ctx, input }) => {
      const room = await ctx.db.room.findUnique({
        where: {
          code: input.roomCode,
        },
      });

      if (!room) {
        return null;
      }

      return await parseRoom(room);
    }),
});
