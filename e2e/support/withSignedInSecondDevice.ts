import type {
  Browser,
  BrowserContextOptions,
} from "@playwright/test";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import type { SecondDeviceSession } from "./models/SecondDeviceSession.interface";
import { signInAsActiveWorker } from "./signInAsActiveWorker";

export const withSignedInSecondDevice = async (
  browser: Browser,
  contextOptions: BrowserContextOptions,
  activeWorker: ActiveWorker,
  inspect: (device: SecondDeviceSession) => Promise<void>
): Promise<void> => {
  const context = await browser.newContext(contextOptions);

  try {
    const page = await context.newPage();
    await signInAsActiveWorker(page, activeWorker);
    await inspect({ context, page });
  } finally {
    await context.close();
  }
};
