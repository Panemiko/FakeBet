"use client";

import { genPusherChannel } from "@/lib/pusher-key";
import { pusherClient } from "@/utils/pusher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RedirectOnPlayer({
  room,
}: {
  room: { id: string; code: string };
}) {
  const router = useRouter();

  useEffect(() => {
    const channel = pusherClient.subscribe(genPusherChannel("room", room.id));

    function onPlayerJoin() {
      router.push(`/room/${room.code}`);
    }

    channel.bind("player-join", onPlayerJoin);

    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [room, router]);

  return null;
}
