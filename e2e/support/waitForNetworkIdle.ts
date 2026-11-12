import type { Page } from "@playwright/test";
import { E2E_LOAD_STATE } from "../constants/E2eRuntime.constants";

export const waitForNetworkIdle = (
  page: Page
): Promise<void> =>
  page.waitForLoadState(E2E_LOAD_STATE.NETWORK_IDLE);
