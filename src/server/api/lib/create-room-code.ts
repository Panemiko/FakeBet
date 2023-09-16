import { generate } from "randomstring";

export async function generateRoomCode() {
  const code = generate({
    length: 4,
    charset: "alphabetic",
  });

  return code.toUpperCase();
}
