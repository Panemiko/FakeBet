import { createServerHelper } from "@/server/api/server-call";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const server = createServerHelper();
  const player = await server.player.byCurrentUser();

  return (
    <div className="min-h-screen bg-neutral-1">
      <header className="flex items-center justify-between px-8 py-10">
        <Link
          href="/"
          className="select-none text-2xl font-medium text-primary-11"
        >
          FakeBet
        </Link>
        <div className="flex items-center gap-5">
          <span className="font-medium text-neutral-12">
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
