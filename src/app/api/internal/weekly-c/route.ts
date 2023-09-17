import { db } from "@/server/db";
import { verifySignature } from "@upstash/qstash/dist/nextjs";

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
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
