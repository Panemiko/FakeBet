import { db } from "@/server/db";
import { verifySignatureEdge } from "@upstash/qstash/dist/nextjs";
import { NextResponse } from "next/server";

const CURRENCY_INCREMENT_BY_WEEK = 10000;

async function handler() {
  const players = await db.player.findMany();

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

  return NextResponse.json({ message: "done" });
}

export const POST = verifySignatureEdge(handler);
