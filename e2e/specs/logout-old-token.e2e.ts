import { PATHS } from "@/app/constants";
import { E2E_SYSTEM_ROUTES } from "../constants/E2eSessionBarPresence.constants";
import { E2E_LOGOUT_BAR_COUNT } from "../constants/E2eLogout.constants";
import { createLoginPage } from "../pages/Login.page";
import { createProfilePage } from "../pages/Profile.page";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { openRouteWithCopiedCookies } from "../support/openRouteWithCopiedCookies";
import { readAccessTokenExpiry } from "../support/readAccessTokenExpiry";
import { readAuthCookies } from "../support/readAuthCookies";
import { waitForNetworkIdle } from "../support/waitForNetworkIdle";

test.describe("An old token after sign-out", () => {
  for (const route of E2E_SYSTEM_ROUTES) {
    test(`opens no screen at ${route} from copied cookies`, async ({
      baseURL,
      browser,
      context,
      signedInPage: page,
    }) => {
      const sessionBar = createSessionBarPage(page);
      const copiedCookies = await readAuthCookies(context);
      expect(
        (
          await readAccessTokenExpiry(copiedCookies)
        ).getTime()
      ).toBeGreaterThan(Date.now());

      await sessionBar.press();
      await sessionBar.confirmSignOut();
      await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
      const copiedPage = await openRouteWithCopiedCookies(
        browser,
        baseURL,
        copiedCookies,
        route
      );

      await expect(copiedPage).toHaveURL(
        PATHS.ACCESS.LOGIN
      );
      await expect(
        createLoginPage(copiedPage).getSubmitButton()
      ).toBeVisible();
    });
  }

  test("does not return to the signed-in screen with Back", async ({
    signedInPage: page,
  }) => {
    const sessionBar = createSessionBarPage(page);
    await createProfilePage(page).goTo();
    await sessionBar.press();
    await sessionBar.confirmSignOut();
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);

    await page.goBack();
    await waitForNetworkIdle(page);

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    await expect(
      createLoginPage(page).getSubmitButton()
    ).toBeVisible();
    await expect(sessionBar.getBar()).toHaveCount(
      E2E_LOGOUT_BAR_COUNT.ABSENT
    );
  });
});
