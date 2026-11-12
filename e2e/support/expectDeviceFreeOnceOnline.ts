import type {
  BrowserContext,
  Page,
} from "@playwright/test";
import { expect } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { createHomePage } from "../pages/Home.page";
import { createLoginPage } from "../pages/Login.page";

export const expectDeviceFreeOnceOnline = async (
  page: Page,
  context: BrowserContext
): Promise<void> => {
  await context.setOffline(false);
  await createHomePage(page).goTo();

  await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
  await expect(
    createLoginPage(page).getSubmitButton()
  ).toBeVisible();
};
