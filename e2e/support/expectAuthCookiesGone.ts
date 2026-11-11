import type { BrowserContext } from "@playwright/test";
import { expect } from "@playwright/test";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { readAuthCookies } from "./readAuthCookies";

export const expectAuthCookiesGone = async (
  context: BrowserContext
): Promise<void> => {
  await expect
    .configure({ soft: true })
    .poll(
      async () => (await readAuthCookies(context)).length
    )
    .toBe(E2E_COUNT.NONE);
};
