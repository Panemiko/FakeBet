"use client";

import { api } from "@/utils/api";
import { roomCodeSchema } from "@/validation/room";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { type TRPCClientError } from "@trpc/client";
import { type AppRouter } from "@/server/api/root";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  roomCode: roomCodeSchema,
});

export function JoinForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomCode: "",
    },
  });

  const { mutateAsync, isLoading } = api.room.join.useMutation();

  const router = useRouter();

  async function joinRoom({ roomCode }: z.infer<typeof formSchema>) {
    const room = await mutateAsync({
      roomCode,
    }).catch((err: TRPCClientError<AppRouter>) => {
      if (err.data?.code === "NOT_FOUND")
        form.setError("roomCode", { message: "Sala não encontrada" });
    });

    if (room) {
      router.push(`/room/${room.code}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(joinRoom)(e)}
        className="flex items-end gap-3"
      >
        <FormField
          control={form.control}
          name="roomCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código da sala</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" isLoading={isLoading}>
          ENTRAR
        </Button>
      </form>
    </Form>
  );
}
