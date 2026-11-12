import { PATHS } from "@/app/constants";
import { E2E_OTHER_DEVICE_SESSIONS } from "../constants/E2eLogoutOtherDevice.constants";
import { createProfilePage } from "../pages/Profile.page";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { countAuthSessions } from "../support/countAuthSessions";
import { refreshContextSession } from "../support/refreshContextSession";

test.describe("Signing out on one device leaves the other signed in", () => {
  test.beforeEach(
    async ({
      activeWorker,
      secondDevice,
      signedInPage,
    }) => {
      expect(secondDevice.context).not.toBe(
        signedInPage.context()
      );
      expect(await countAuthSessions(activeWorker.id)).toBe(
        E2E_OTHER_DEVICE_SESSIONS.BEFORE_SIGN_OUT
      );

      await createSessionBarPage(signedInPage).signOut();
      await expect(signedInPage).toHaveURL(
        PATHS.ACCESS.LOGIN
      );
    }
  );

  test("keeps the other device on its screen with the session bar", async ({
    secondDevice,
  }) => {
    const profilePage = createProfilePage(
      secondDevice.page
    );

    await profilePage.goTo();

    await expect(secondDevice.page).toHaveURL(
      PATHS.PROFILE.ROOT
    );
    await expect(profilePage.getHeading()).toBeVisible();
    await expect(
      createSessionBarPage(secondDevice.page).getBar()
    ).toBeVisible();
  });

  test("still refreshes the session of the other device", async ({
    secondDevice,
  }) => {
    expect(
      await refreshContextSession(secondDevice.context)
    ).toBeNull();
  });

  test("ends only the session of the device that signed out", async ({
    activeWorker,
  }) => {
    expect(await countAuthSessions(activeWorker.id)).toBe(
      E2E_OTHER_DEVICE_SESSIONS.AFTER_SIGN_OUT
    );
  });
});
