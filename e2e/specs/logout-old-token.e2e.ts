import { PATHS } from "@/app/constants";
import {
  E2E_OLD_TOKEN_SCENARIO,
  E2E_PAGE_GUARDED_ROUTES,
  E2E_PROXY_GUARDED_ROUTES,
} from "../constants/E2eLogoutOldToken.constants";
import { E2E_LOAD_STATE } from "../constants/E2eRuntime.constants";
import { E2E_LOGOUT_BAR_COUNT } from "../constants/E2eLogout.constants";
import { createLoginPage } from "../pages/Login.page";
import { createProfilePage } from "../pages/Profile.page";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { openRouteWithCopiedCookies } from "../support/openRouteWithCopiedCookies";
import { readAccessTokenExpiry } from "../support/readAccessTokenExpiry";
import { readAuthCookies } from "../support/readAuthCookies";
import { resolveSystemRoute } from "../support/resolveSystemRoute";

const copiedCookieScenarios = [
  {
    routes: E2E_PROXY_GUARDED_ROUTES,
    title: E2E_OLD_TOKEN_SCENARIO.PROXY_GUARDED,
  },
  {
    routes: E2E_PAGE_GUARDED_ROUTES,
    title: E2E_OLD_TOKEN_SCENARIO.PAGE_GUARDED,
  },
];

for (const { routes, title } of copiedCookieScenarios) {
  test.describe(`Copied cookies after sign-out ${title}`, () => {
    for (const route of routes) {
      test(`${route}`, async ({
        browser,
        context,
        baseURL,
        signedInPage: page,
      }, testInfo) => {
        const sessionBar = createSessionBarPage(page);
        const concreteRoute =
          await resolveSystemRoute(route);
        const copiedCookies =
          await readAuthCookies(context);
        expect(
          (
            await readAccessTokenExpiry(copiedCookies)
          ).getTime()
        ).toBeGreaterThan(Date.now());

        await sessionBar.signOut();
        await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);

        await openRouteWithCopiedCookies(
          browser,
          { ...testInfo.project.use, baseURL },
          copiedCookies,
          concreteRoute,
          async (copiedPage) => {
            await expect(copiedPage).toHaveURL(
              PATHS.ACCESS.LOGIN
            );
            await expect(
              createLoginPage(copiedPage).getSubmitButton()
            ).toBeVisible();
          }
        );
      });
    }
  });
}

test.describe("Back after sign-out", () => {
  test("never returns to the signed-in screen", async ({
    signedInPage: page,
  }) => {
    const sessionBar = createSessionBarPage(page);
    await createProfilePage(page).goTo();
    await sessionBar.signOut();
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);

    await page.goBack({ waitUntil: E2E_LOAD_STATE.LOAD });
    await page.waitForURL(PATHS.ACCESS.LOGIN, {
      waitUntil: E2E_LOAD_STATE.LOAD,
    });

    await expect(
      createLoginPage(page).getSubmitButton()
    ).toBeVisible();
    await expect(sessionBar.getBar()).toHaveCount(
      E2E_LOGOUT_BAR_COUNT.ABSENT
    );
  });
});
