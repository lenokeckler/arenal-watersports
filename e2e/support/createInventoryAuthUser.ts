import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import { E2E_AUTH_ERROR } from "../constants/E2eInventory.constants";
import { E2E_INVENTORY_ACCESS } from "../constants/E2eInventoryAccess.constants";
import { createLocalInventoryClient } from "./createLocalInventoryClient";

export const createInventoryAuthUser = async (
  username: string
): Promise<string> => {
  const { data, error } =
    await createLocalInventoryClient().auth.admin.createUser(
      {
        email: toAuthEmail(username),
        email_confirm: true,
        password: E2E_INVENTORY_ACCESS.AUTH_PASSWORD,
      }
    );
  if (error || !data.user) {
    throw new Error(
      E2E_AUTH_ERROR.INVENTORY_AUTH_USER_CREATION,
      { cause: error }
    );
  }
  return data.user.id;
};
