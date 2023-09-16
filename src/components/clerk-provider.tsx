import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { colors } from "tailwind.config";
import { ptBR } from "@clerk/localizations";

export function CustomClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          borderRadius: "6px",
          colorAlphaShade: "white",
          colorBackground: colors.neutral[2],
          colorDanger: colors.danger[9],
          colorInputBackground: colors.neutral[6],
          colorInputText: colors.neutral[12],
          colorPrimary: colors.primary[9],
          colorSuccess: colors.success[9],
          colorText: colors.neutral[11],
          colorTextOnPrimaryBackground: colors.white.A12,
          colorTextSecondary: colors.white.A12,
          colorWarning: colors.warning[9],
        },
        layout: {
          showOptionalFields: true,
        },
      }}
      localization={ptBR}
      afterSignInUrl="/"
      afterSignUpUrl="/"
      signInUrl="/auth/sign-in"
      signUpUrl="/auth/sign-up"
    >
      {children}
    </ClerkProvider>
  );
}
