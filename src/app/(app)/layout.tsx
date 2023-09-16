import { createServerHelper } from "@/server/api/server-call";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const server = createServerHelper();
  const player = await server.player.byCurrentUser();

  return (
    <div className="bg-neutral-1 min-h-screen">
      <header className="flex items-center justify-between px-8 py-10">
        <span className="text-primary-11 select-none text-2xl font-medium">
          FakeBet
        </span>
        <div className="flex items-center gap-5">
          <span className="text-neutral-12 font-medium">
            {player.currency}
            <span className="text-neutral-11">c</span>
          </span>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-12 w-12",
              },
            }}
          />
        </div>
      </header>
      {children}
    </div>
  );
}
