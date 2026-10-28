import { randomUUID } from "node:crypto";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import { E2E_AUTH_ERROR } from "../constants/E2eInventory.constants";
import { createLocalInventoryClient } from "./createLocalInventoryClient";

export const createInventoryAuthUser = async (
  username: string
): Promise<string> => {
  const { data, error } =
    await createLocalInventoryClient().auth.admin.createUser(
      {
        email: toAuthEmail(username),
        email_confirm: true,
        password: randomUUID(),
      }
    );
  if (error || !data.user) {
    throw new Error(E2E_AUTH_ERROR.SESSION, {
      cause: error,
    });
  }
  return data.user.id;
};
