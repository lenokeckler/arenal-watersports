import { test as pendingTest } from "../support/pendingWorkerTest";
import {
  E2E_APP_DIRECTORY,
  E2E_FULL_VISIBILITY_RATIO,
  E2E_PRE_LOGIN_ROUTES,
  E2E_PRESENCE_COUNT,
  E2E_SYSTEM_ROUTES,
} from "../constants/E2eSessionBarPresence.constants";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { listPageRoutes } from "../support/listPageRoutes";
import { getMainRegion } from "../support/mainRegion";
import { STATELESS_PRE_LOGIN_SCREENS } from "../support/preLoginScreens";

test.describe("Session bar on every authenticated screen", () => {
  for (const route of E2E_SYSTEM_ROUTES) {
    test(`shows one banner with one sign-out button on ${route}`, async ({
      signedInPage: page,
    }) => {
      const sessionBar = createSessionBarPage(page);

      await sessionBar.goTo(route);

      await expect(getMainRegion(page)).toBeVisible();
      await expect(sessionBar.getBar()).toHaveCount(
        E2E_PRESENCE_COUNT.EXACTLY_ONE
      );
      await expect(
        sessionBar.getAllLogoutButtons()
      ).toHaveCount(E2E_PRESENCE_COUNT.EXACTLY_ONE);
      await expect(
        sessionBar.getIdleButton()
      ).toBeVisible();
    });

    test(`keeps the sign-out button in the viewport at load and after scrolling on ${route}`, async ({
      signedInPage: page,
    }) => {
      const sessionBar = createSessionBarPage(page);

      await sessionBar.goTo(route);

      await expect(
        sessionBar.getIdleButton()
      ).toBeInViewport({
        ratio: E2E_FULL_VISIBILITY_RATIO,
      });

      await sessionBar.scrollToBottom();

      await expect(
        sessionBar.getIdleButton()
      ).toBeInViewport({
        ratio: E2E_FULL_VISIBILITY_RATIO,
      });
    });
  }

  test("covers every authenticated page that exists on disk", () => {
    expect(
      listPageRoutes(E2E_APP_DIRECTORY.SYSTEM)
    ).toEqual([...E2E_SYSTEM_ROUTES].sort());
  });
});

test.describe("Session bar never on a pre-login screen", () => {
  for (const screen of STATELESS_PRE_LOGIN_SCREENS) {
    test(`shows no banner and no sign-out button on ${screen.route}`, async ({
      page,
    }) => {
      const sessionBar = createSessionBarPage(page);

      await screen.open(page);

      await expect(
        screen.getReadyMarker(page)
      ).toBeVisible();
      await expect(sessionBar.getBar()).toHaveCount(
        E2E_PRESENCE_COUNT.NONE
      );
      await expect(
        sessionBar.getAllLogoutButtons()
      ).toHaveCount(E2E_PRESENCE_COUNT.NONE);
    });
  }

  test("covers every pre-login page that exists on disk", () => {
    expect(
      listPageRoutes(E2E_APP_DIRECTORY.ACCESS)
    ).toEqual([...E2E_PRE_LOGIN_ROUTES].sort());
  });
});

pendingTest.describe(
  "Session bar on the first sign-in screen",
  () => {
    pendingTest(
      "shows no banner and no sign-out button",
      async ({ firstSignInPage, page }) => {
        const sessionBar = createSessionBarPage(page);

        await expect(
          firstSignInPage.getHeading()
        ).toBeVisible();
        await expect(sessionBar.getBar()).toHaveCount(
          E2E_PRESENCE_COUNT.NONE
        );
        await expect(
          sessionBar.getAllLogoutButtons()
        ).toHaveCount(E2E_PRESENCE_COUNT.NONE);
      }
    );
  }
);
