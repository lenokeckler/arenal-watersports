import { E2E_LOGOUT_OFFLINE } from "../constants/E2eLogoutOffline.constants";
import {
  E2E_LOGOUT_BAR_COUNT,
  E2E_LOGOUT_COPY,
} from "../constants/E2eLogout.constants";
import { readAuthCookies } from "../support/readAuthCookies";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { E2E_LOGOUT_SERVER_FAILURE_SESSIONS } from "../constants/E2eLogoutResilience.constants";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { countAuthSessions } from "../support/countAuthSessions";
import { expectAuthCookiesGone } from "../support/expectAuthCookiesGone";
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

    const sessionBar = createSessionBarPage(page);

    await sessionBar.signOut();
    await page.clock.runFor(
      E2E_LOGOUT_OFFLINE.FALLBACK_DUE_MS
    );

    expect(await readAuthCookies(context)).toHaveLength(
      E2E_COUNT.NONE
    );
    await expect(
      page.getByText(E2E_LOGOUT_COPY.ERROR)
    ).toHaveCount(E2E_LOGOUT_BAR_COUNT.ABSENT);
    await expect(
      sessionBar.getAllLogoutButtons()
    ).toHaveCount(E2E_LOGOUT_BAR_COUNT.ABSENT);
    expect(await countAuthSessions(activeWorker.id)).toBe(
      E2E_LOGOUT_SERVER_FAILURE_SESSIONS.STILL_ON_SERVER
    );
    await expectDeviceFreeOnceOnline(page, context);
  });
});
