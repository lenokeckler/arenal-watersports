import type {
  Browser,
  BrowserContextOptions,
  Cookie,
  Page,
} from "@playwright/test";
import { withSecondContext } from "./withSecondContext";

export const openRouteWithCopiedCookies = (
  browser: Browser,
  contextOptions: BrowserContextOptions,
  cookies: Cookie[],
  route: string,
  inspect: (copiedPage: Page) => Promise<void>
): Promise<void> =>
  withSecondContext(
    browser,
    contextOptions,
    async (copiedContext) => {
      await copiedContext.addCookies(cookies);
      const copiedPage = await copiedContext.newPage();
      await copiedPage.goto(route);
      await inspect(copiedPage);
    }
  );
