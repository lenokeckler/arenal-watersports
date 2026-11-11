import type { Page } from "@playwright/test";
import { E2E_SESSION_IDLE_WARNING_RPC } from "../constants/E2eSessionIdleWarning.constants";

export const answerSessionSecondsLeft = async (
  page: Page,
  secondsLeft: number
): Promise<() => Promise<void>> => {
  await page.route(
    E2E_SESSION_IDLE_WARNING_RPC.SECONDS_LEFT,
    (route) => route.fulfill({ json: secondsLeft })
  );

  return () =>
    page.unroute(E2E_SESSION_IDLE_WARNING_RPC.SECONDS_LEFT);
};
