import { auth } from "@clerk/nextjs";
import { appRouter } from "./root";
import { db } from "@/server/db";
import {
  type SignedInAuthObject,
  type SignedOutAuthObject,
} from "@clerk/nextjs/dist/types/server";

export function createServerHelper(
  altAuth?: SignedInAuthObject | SignedOutAuthObject,
) {
  return appRouter.createCaller({
    auth: altAuth ?? auth(),
    db,
  });
}
