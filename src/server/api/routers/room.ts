import { type Room } from "@prisma/client";
import { generateRoomCode } from "../lib/create-room-code";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { roomCodeSchema } from "@/validation/room";
import { TRPCError } from "@trpc/server";

async function parseRoom(room: Room) {
  return {
    id: room.id,
    code: room.code,
  };
}

export const roomRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const player = await ctx.db.player.findUnique({
      where: {
        id: ctx.auth.userId,
      },
    });

    if (player?.currentRoomId) {
      const currentRoom = await ctx.db.room.findUnique({
        where: {
          id: player.currentRoomId,
        },
        include: {
          players: true,
        },
      });

      // Delete the room if there's just the player on it
      if (currentRoom?.players?.length === 1) {
        await ctx.db.room.delete({
          where: {
            id: currentRoom.id,
          },
        });
      }
    }

    // Create a new room and then insert the player in it
    const room = await ctx.db.room.create({
      data: {
        code: await generateRoomCode(),
      },
    });

    await ctx.db.player.update({
      where: {
        id: player?.id,
      },
      data: {
        currentRoomId: room.id,
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

      if (!room) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await ctx.db.player.update({
        where: {
          id: ctx.auth.userId,
        },
        data: {
          currentRoomId: room.id,
        },
      });

      return await parseRoom(room);
    }),
});
