import { test as pendingTest } from "../support/pendingWorkerTest";
import {
  E2E_FULL_VISIBILITY_RATIO,
  E2E_MIN_SCROLL_OFFSET_PX,
  E2E_OVERFLOW_VIEWPORT_MULTIPLE,
  E2E_PRESENCE_COUNT,
  E2E_SYSTEM_ROUTES,
} from "../constants/E2eSessionBarPresence.constants";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { getMainRegion } from "../support/mainRegion";
import { STATELESS_PRE_LOGIN_SCREENS } from "../support/preLoginScreens";

test.describe("Session bar on every authenticated screen", () => {
  for (const route of E2E_SYSTEM_ROUTES) {
    test(`shows one banner with one sign-out button on ${route}`, async ({
      signedInPage: page,
    }) => {
      const sessionBar = createSessionBarPage(page);

      await page.goto(route);

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

      await page.goto(route);

      await expect(
        sessionBar.getIdleButton()
      ).toBeInViewport({
        ratio: E2E_FULL_VISIBILITY_RATIO,
      });

      await expect(async () => {
        await sessionBar.addOverflow(
          E2E_OVERFLOW_VIEWPORT_MULTIPLE
        );
        await sessionBar.scrollToBottom();

        expect(
          await sessionBar.readScrollOffset()
        ).toBeGreaterThan(E2E_MIN_SCROLL_OFFSET_PX);
      }).toPass();

      await expect(
        sessionBar.getIdleButton()
      ).toBeInViewport({
        ratio: E2E_FULL_VISIBILITY_RATIO,
      });
    });
  }
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
