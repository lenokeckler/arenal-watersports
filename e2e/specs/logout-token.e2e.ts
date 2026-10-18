import { PATHS } from "@/app/constants";
import { E2E_SIGNED_IN_SESSION_COUNT } from "../constants/E2eLogoutToken.constants";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { countAuthSessions } from "../support/countAuthSessions";
import { expectAuthCookiesGone } from "../support/expectAuthCookiesGone";
import { expectRefreshTokenRefused } from "../support/expectRefreshTokenRefused";
import { expectServerSessionEnded } from "../support/expectServerSessionEnded";
import { readAuthCookies } from "../support/readAuthCookies";
import { readRefreshTokenFromCookies } from "../support/readRefreshTokenFromCookies";

test.describe("Sign out discards the token", () => {
  test("removes the cookies, ends the server session and refuses the old refresh token", async ({
    activeWorker,
    context,
    signedInPage: page,
  }) => {
    const sessionBar = createSessionBarPage(page);
    const refreshToken = await readRefreshTokenFromCookies(
      await readAuthCookies(context)
    );
    expect(await countAuthSessions(activeWorker.id)).toBe(
      E2E_SIGNED_IN_SESSION_COUNT
    );

    await sessionBar.signOut();
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);

    await expectAuthCookiesGone(context);
    await expectServerSessionEnded(activeWorker.id);
    await expectRefreshTokenRefused(refreshToken);
  });
});
