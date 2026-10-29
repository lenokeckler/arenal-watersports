import type {
  Browser,
  BrowserContext,
  BrowserContextOptions,
} from "@playwright/test";

export const withSecondContext = async <Result>(
  browser: Browser,
  contextOptions: BrowserContextOptions,
  inspect: (context: BrowserContext) => Promise<Result>
): Promise<Result> => {
  const context = await browser.newContext(contextOptions);

  try {
    return await inspect(context);
  } finally {
    await context.close();
  }
};
