import { JoinForm } from "@/components/join-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServerHelper } from "@/server/api/server-call";
import { currentUser } from "@clerk/nextjs";

export default async function AppHomePage() {
  const server = createServerHelper();
  const user = await currentUser();

  const room = await server.room.create();

  return (
    <div className="flex flex-col px-8 py-5">
      <div className="mb-5 flex items-end gap-3">
        <span className="text-2xl text-neutral-11">
          Olá,{" "}
          <span className="font-bold text-neutral-12">{user?.username}</span>
        </span>
      </div>
      <div className="mb-10 flex gap-3 rounded-lg bg-neutral-2 px-5 py-3">
        <div className="flex items-center justify-center gap-3">
          <span className="text-xl text-neutral-11">
            Código para jogo rápido
          </span>
          <span className="text-4xl font-bold text-neutral-12">
            #{room.code}
          </span>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Entrar em sala</CardTitle>
          <CardDescription>Insira o código da sala para entrar</CardDescription>
        </CardHeader>
        <CardContent>
          <JoinForm />
        </CardContent>
      </Card>
    </div>
  );
}
