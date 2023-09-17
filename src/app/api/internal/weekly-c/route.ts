import { db } from "@/server/db";
import { verifySignatureEdge } from "@upstash/qstash/dist/nextjs";
import { NextResponse } from "next/server";

const CURRENCY_INCREMENT_BY_WEEK = 10000;

async function handler() {
  console.info("> Quering all players");

  const players = await db.player.findMany();

  console.info("> Updating currencies");
  players.forEach((player) => {
    void db.player.update({
      where: {
        id: player.id,
      },
      data: {
        currency: player.currency + CURRENCY_INCREMENT_BY_WEEK,
      },
    });
  });

  console.info("> Updated successfully");

  return NextResponse.json({ message: "done" });
}

export const POST = verifySignatureEdge(handler);
