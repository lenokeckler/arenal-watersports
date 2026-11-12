import type { Page } from "@playwright/test";
import { E2E_INVENTORY_FIXTURE } from "../constants/E2eInventory.constants";
import { E2E_BASE_URL } from "../constants/E2eRuntime.constants";
import { createInventoryAuthSession } from "./createInventoryAuthSession";
import { createInventoryAuthCookies } from "./createInventoryAuthCookies";

export const authenticateInventoryUser = async (
  page: Page,
  username: string = E2E_INVENTORY_FIXTURE.ADMIN_USERNAME
): Promise<void> => {
  const session =
    await createInventoryAuthSession(username);
  const authCookies =
    await createInventoryAuthCookies(session);
  await page.context().addCookies(
    authCookies.map(({ name, value }) => ({
      name,
      url: E2E_BASE_URL,
      value,
    }))
  );
};
