import type { Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_OTHER_DEVICE_SESSIONS } from "../constants/E2eLogoutOtherDevice.constants";
import { createProfilePage } from "../pages/Profile.page";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { expect, test } from "../support/activeWorkerTest";
import { countAuthSessions } from "../support/countAuthSessions";
import { refreshContextSession } from "../support/refreshContextSession";
import type { ActiveWorker } from "../support/models/ActiveWorker.interface";
import { withSignedInSecondDevice } from "../support/withSignedInSecondDevice";

const signOutThisDevice = async (
  page: Page
): Promise<void> => {
  const sessionBar = createSessionBarPage(page);

  await sessionBar.press();
  await sessionBar.confirmSignOut();
  await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
};

const expectTwoSessionsThenSignOut = async (
  activeWorker: ActiveWorker,
  page: Page
): Promise<void> => {
  expect(await countAuthSessions(activeWorker.id)).toBe(
    E2E_OTHER_DEVICE_SESSIONS.BEFORE_SIGN_OUT
  );
  await signOutThisDevice(page);
};

test.describe("Signing out on one device leaves the other signed in", () => {
  test("keeps the other device on its screen with the session bar", async ({
    activeWorker,
    browser,
    baseURL,
    signedInPage: page,
  }, testInfo) => {
    await withSignedInSecondDevice(
      browser,
      { ...testInfo.project.use, baseURL },
      activeWorker,
      async ({ page: otherPage }) => {
        await expectTwoSessionsThenSignOut(
          activeWorker,
          page
        );

        await createProfilePage(otherPage).goTo();

        await expect(otherPage).toHaveURL(
          PATHS.PROFILE.ROOT
        );
        await expect(
          createProfilePage(otherPage).getHeading()
        ).toBeVisible();
        await expect(
          createSessionBarPage(otherPage).getBar()
        ).toBeVisible();
      }
    );
  });

  test("still refreshes the session of the other device", async ({
    activeWorker,
    browser,
    baseURL,
    signedInPage: page,
  }, testInfo) => {
    await withSignedInSecondDevice(
      browser,
      { ...testInfo.project.use, baseURL },
      activeWorker,
      async ({ context }) => {
        await expectTwoSessionsThenSignOut(
          activeWorker,
          page
        );

        expect(
          await refreshContextSession(context)
        ).toBeNull();
      }
    );
  });

  test("ends only the session of the device that signed out", async ({
    activeWorker,
    browser,
    baseURL,
    signedInPage: page,
  }, testInfo) => {
    await withSignedInSecondDevice(
      browser,
      { ...testInfo.project.use, baseURL },
      activeWorker,
      async () => {
        await expectTwoSessionsThenSignOut(
          activeWorker,
          page
        );

        expect(
          await countAuthSessions(activeWorker.id)
        ).toBe(E2E_OTHER_DEVICE_SESSIONS.AFTER_SIGN_OUT);
      }
    );
  });
});
