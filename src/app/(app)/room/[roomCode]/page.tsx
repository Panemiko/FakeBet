import { createServerHelper } from "@/server/api/server-call";
import { notFound } from "next/navigation";
import { PlayerCounter } from "./player-counter";

export async function generateMetadata({
  params,
}: {
  params: { roomCode: string };
}) {
  return {
    title: params.roomCode,
  };
}

export default async function RoomPage({
  params,
}: {
  params: { roomCode: string };
}) {
  const { roomCode } = params;

  const server = createServerHelper();
  const room = await server.room.byCode({ roomCode });

  if (!room) {
    return notFound();
  }

  // Guarantees the player is on the room
  await server.room.join({ roomCode });

  const players = await server.player.byRoom({ roomId: room.id });

  if (players === null) {
    return notFound();
  }

  return (
    <div className="flex items-center justify-between px-8">
      <div>
        <span className="text-neutral-11">Sala</span>
        <h1 className="text-3xl font-medium text-neutral-12">{room?.code}</h1>
      </div>
      <div>
        <PlayerCounter defaultCount={players.length} roomId={room.id} />
      </div>
    </div>
  );
}
