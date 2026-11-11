import { PATHS } from "@/app/constants";
import {
  E2E_LOGOUT_REQUEST_COUNT,
  E2E_LOGOUT_SERVER_FAILURE_SESSIONS,
} from "../constants/E2eLogoutResilience.constants";
import { createLoginPage } from "../pages/Login.page";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { countAuthSessions } from "../support/countAuthSessions";
import { expectAuthCookiesGone } from "../support/expectAuthCookiesGone";
import { failLogoutRequests } from "../support/failLogoutRequests";
import { trackLogoutRequests } from "../support/trackLogoutRequests";

test.describe("Sign out resilience", () => {
  test("signs out locally when the server fails, leaving its session open as an expected residual", async ({
    activeWorker,
    context,
    signedInPage: page,
  }) => {
    await failLogoutRequests(page);

    await createSessionBarPage(page).signOut();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    await expect(
      createLoginPage(page).getSignedOutNotice()
    ).toBeVisible();
    await expectAuthCookiesGone(context);
    expect(await countAuthSessions(activeWorker.id)).toBe(
      E2E_LOGOUT_SERVER_FAILURE_SESSIONS.STILL_ON_SERVER
    );
  });

  test("sends a single logout request when the confirm button is tapped twice quickly", async ({
    signedInPage: page,
  }) => {
    const sessionBar = createSessionBarPage(page);
    const logoutRequests = trackLogoutRequests(page);
    await sessionBar.press();
    await expect(
      sessionBar.getConfirmButton()
    ).toBeVisible();

    await sessionBar.doubleTapConfirm();

    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
    expect(logoutRequests.count()).toBe(
      E2E_LOGOUT_REQUEST_COUNT.SINGLE
    );
  });
});
