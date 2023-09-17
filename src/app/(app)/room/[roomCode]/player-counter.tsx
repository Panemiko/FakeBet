"use client";

import { genPusherChannel } from "@/lib/pusher-key";
import { pusherClient } from "@/utils/pusher";
import { useEffect, useState } from "react";

export function PlayerCounter({
  defaultCount,
  roomId,
}: {
  defaultCount: number;
  roomId: string;
}) {
  const [playerCount, setPlayerCount] = useState(defaultCount);

  useEffect(() => {
    const channel = pusherClient.subscribe(genPusherChannel("room", roomId));

    function onPlayerJoin() {
      console.log("Player Joined");
      setPlayerCount((value) => value++);
    }

    function onPlayerLeft() {
      console.log("Player Left");
      setPlayerCount((value) => value--);
    }

    channel.bind("player-join", onPlayerJoin);
    channel.bind("player-left", onPlayerLeft);

    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [roomId]);

  return (
    <span className="text-neutral-11">
      <span className="font-medium">{playerCount}</span> jogadores
    </span>
  );
}
