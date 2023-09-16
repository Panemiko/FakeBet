import { TRPCProvider } from "@/components/trpc-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "FakeBet",
    template: "%s | FakeBet",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TRPCProvider>
        <html lang="pt-BR">
          <body>{children}</body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  );
}
