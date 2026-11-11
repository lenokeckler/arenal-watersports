import type { Page } from "@playwright/test";
import { signInAsSeededWorker } from "./signInAsSeededWorker";

export const logInAsAdmin = (page: Page): Promise<void> =>
  signInAsSeededWorker(page);
