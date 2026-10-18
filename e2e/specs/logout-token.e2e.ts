import {
  E2E_REFRESH_GRANT_ERROR,
  E2E_SIGNED_IN_SESSION_COUNT,
} from "../constants/E2eLogoutToken.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { E2E_AUTH_ERROR_CODE } from "../constants/E2eSupabase.constants";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { countAuthSessions } from "../support/countAuthSessions";
import { readAuthCookies } from "../support/readAuthCookies";
import { readRefreshTokenFromCookies } from "../support/readRefreshTokenFromCookies";
import { requestRefreshGrant } from "../support/requestRefreshGrant";
import { PATHS } from "@/app/constants";

test.describe("Sign out discards the token", () => {
  test("removes the cookies, ends the server session and refuses the old refresh token", async ({
    activeWorker,
    context,
    signedInPage: page,
  }) => {
    const sessionBar = createSessionBarPage(page);
    const cookiesBefore = await readAuthCookies(context);
    const refreshToken =
      readRefreshTokenFromCookies(cookiesBefore);
    expect(cookiesBefore.length).toBeGreaterThan(
      E2E_COUNT.NONE
    );
    expect(await countAuthSessions(activeWorker.id)).toBe(
      E2E_SIGNED_IN_SESSION_COUNT
    );

    await sessionBar.press();
    await sessionBar.confirmSignOut();
    await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);

    await expect
      .poll(
        async () => (await readAuthCookies(context)).length
      )
      .toBe(E2E_COUNT.NONE);
    await expect
      .poll(() => countAuthSessions(activeWorker.id))
      .toBe(E2E_COUNT.NONE);
    const replay = await requestRefreshGrant(refreshToken);
    expect(replay.status).toBeGreaterThanOrEqual(
      E2E_REFRESH_GRANT_ERROR.CLIENT_ERROR_MIN_STATUS
    );
    expect(replay.status).toBeLessThanOrEqual(
      E2E_REFRESH_GRANT_ERROR.CLIENT_ERROR_MAX_STATUS
    );
    expect(replay.errorCode).toBe(
      E2E_AUTH_ERROR_CODE.SESSION_GONE
    );
    expect(replay.accessToken).toBeUndefined();
  });
});
