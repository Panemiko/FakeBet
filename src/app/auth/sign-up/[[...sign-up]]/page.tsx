import { SignUp } from "@clerk/nextjs";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastrar",
};

export default function Page() {
  return <SignUp />;
}
