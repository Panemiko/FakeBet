import { createServerHelper } from "@/server/api/server-call";
import { auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

export default async function AppHomePage() {
  const server = createServerHelper();
  const { userId } = auth();

  const player = await server.player.byId({
    playerId: userId!,
  });

  if (!player) {
    return notFound()
  } 

  return <div>{player.currency}</div>;
}
