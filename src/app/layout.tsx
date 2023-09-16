import { CustomClerkProvider } from "@/components/clerk-provider";
import { TRPCProvider } from "@/components/trpc-provider";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const defaultFont = Inter({
  subsets: ["latin"],
});

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
    <CustomClerkProvider>
      <TRPCProvider>
        <html lang="pt-BR">
          <body className={defaultFont.className}>{children}</body>
        </html>
      </TRPCProvider>
    </CustomClerkProvider>
  );
}
