import type {
  Browser,
  Cookie,
  Page,
} from "@playwright/test";

export const openRouteWithCopiedCookies = async (
  browser: Browser,
  baseURL: string | undefined,
  cookies: Cookie[],
  route: string
): Promise<Page> => {
  const copiedContext = await browser.newContext({
    baseURL,
  });
  await copiedContext.addCookies(cookies);
  const copiedPage = await copiedContext.newPage();
  await copiedPage.goto(route);

  return copiedPage;
};
