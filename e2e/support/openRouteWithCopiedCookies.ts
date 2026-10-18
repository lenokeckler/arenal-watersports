import type {
  Browser,
  BrowserContextOptions,
  Cookie,
  Page,
} from "@playwright/test";

export const openRouteWithCopiedCookies = async (
  browser: Browser,
  contextOptions: BrowserContextOptions,
  cookies: Cookie[],
  route: string,
  inspect: (copiedPage: Page) => Promise<void>
): Promise<void> => {
  const copiedContext =
    await browser.newContext(contextOptions);

  try {
    await copiedContext.addCookies(cookies);
    const copiedPage = await copiedContext.newPage();
    await copiedPage.goto(route);
    await inspect(copiedPage);
  } finally {
    await copiedContext.close();
  }
};
