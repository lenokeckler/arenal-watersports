import { E2E_LOGOUT_SERVER_FAILURE_SESSIONS } from "../constants/E2eLogoutResilience.constants";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { countAuthSessions } from "../support/countAuthSessions";
import { expectAuthCookiesGone } from "../support/expectAuthCookiesGone";
import { expectAuthCookiesGoneAfterRetries } from "../support/expectAuthCookiesGoneAfterRetries";
import { expectDeviceFreeOnceOnline } from "../support/expectDeviceFreeOnceOnline";
import { expireAccessTokenInBrowser } from "../support/expireAccessTokenInBrowser";

test.describe("Sign out without signal", () => {
  test("removes the cookies with a fresh access token and frees the device once back online", async ({
    activeWorker,
    context,
    signedInPage: page,
  }) => {
    await context.setOffline(true);

    await createSessionBarPage(page).signOut();

    await expectAuthCookiesGone(context);
    expect(await countAuthSessions(activeWorker.id)).toBe(
      E2E_LOGOUT_SERVER_FAILURE_SESSIONS.STILL_ON_SERVER
    );
    await expectDeviceFreeOnceOnline(page, context);
  });

  test("removes the cookies itself when the access token expired and the refresh cannot reach the server", async ({
    activeWorker,
    context,
    signedInPage: page,
  }) => {
    await context.setOffline(true);
    await expireAccessTokenInBrowser(page, context);

    await createSessionBarPage(page).signOut();

    await expectAuthCookiesGoneAfterRetries(page, context);
    expect(await countAuthSessions(activeWorker.id)).toBe(
      E2E_LOGOUT_SERVER_FAILURE_SESSIONS.STILL_ON_SERVER
    );
    await expectDeviceFreeOnceOnline(page, context);
  });
});
