import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-1 min-h-screen">
      <header className="flex items-center justify-between px-8 py-10">
        <span className="text-neutral-11 text-2xl font-medium">FakeBet</span>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "h-12 w-12",
            },
          }}
        />
      </header>
      {children}
    </div>
  );
}
