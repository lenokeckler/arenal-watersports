import { PATHS } from "@/app/constants";
import {
  E2E_SESSION_ACTIVITY_AGE,
  E2E_SESSION_ACTIVITY_MAX_SECONDS_AFTER_TAP,
} from "../constants/E2eSessionIdle.constants";
import { createHomePage } from "../pages/Home.page";
import { createLoginPage } from "../pages/Login.page";
import { createProfilePage } from "../pages/Profile.page";
import { expect, test } from "../support/activeWorkerTest";
import { expectAuthCookiesGone } from "../support/expectAuthCookiesGone";
import { expectServerSessionEnded } from "../support/expectServerSessionEnded";
import { readSecondsSinceSessionActivity } from "../support/readSecondsSinceSessionActivity";
import { setSessionActivityAge } from "../support/setSessionActivityAge";

test.describe("Sign-out for inactivity", () => {
  test("closes an idle session on the next request and explains it on the login", async ({
    activeWorker,
    context,
    signedInPage: page,
  }) => {
    const loginPage = createLoginPage(page);
    await setSessionActivityAge(
      activeWorker.id,
      E2E_SESSION_ACTIVITY_AGE.PAST_ANY_NIGHT
    );

    await createProfilePage(page).goTo();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    await expect(
      loginPage.getSessionIdleNotice()
    ).toBeVisible();
    await expectServerSessionEnded(activeWorker.id);
    await expectAuthCookiesGone(context);
  });

  test("a tap on a screen of an idle session leaves it for the login with the notice", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const homePage = createHomePage(page);
    const loginPage = createLoginPage(page);
    await homePage.goTo();
    await expect(homePage.getHeading()).toBeVisible();
    await setSessionActivityAge(
      activeWorker.id,
      E2E_SESSION_ACTIVITY_AGE.PAST_ANY_NIGHT
    );

    await homePage.getHeading().click();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    await expect(
      loginPage.getSessionIdleNotice()
    ).toBeVisible();
    await expectServerSessionEnded(activeWorker.id);
  });

  test("an action on screen restarts the count and keeps the session", async ({
    activeWorker,
    signedInPage: page,
  }) => {
    const homePage = createHomePage(page);
    await homePage.goTo();
    await expect(homePage.getHeading()).toBeVisible();
    await setSessionActivityAge(
      activeWorker.id,
      E2E_SESSION_ACTIVITY_AGE.INSIDE_THE_LIMIT
    );

    await homePage.getHeading().click();

    await expect
      .poll(() =>
        readSecondsSinceSessionActivity(activeWorker.id)
      )
      .toBeLessThan(
        E2E_SESSION_ACTIVITY_MAX_SECONDS_AFTER_TAP
      );
    await homePage.goTo();
    await expect(page).toHaveURL(PATHS.BOARD);
    await expect(homePage.getHeading()).toBeVisible();
  });
});
