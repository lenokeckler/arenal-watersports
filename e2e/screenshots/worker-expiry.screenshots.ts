import { SUPABASE_WORK_AREA } from "@/app/constants";
import {
  E2E_WORKER_EXPIRY,
  E2E_WORKER_EXPIRY_SCREENSHOT_BASENAME,
} from "../constants/E2eWorkerExpiry.constants";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { captureFullPage } from "../support/captureFullPage";
import { createWorkerListFilterFixtureWorker } from "../support/createWorkerListFilterFixtureWorker";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";
import { expect, test } from "@playwright/test";

const buildFutureDate = (): string =>
  new Date(
    Date.now() +
      E2E_WORKER_EXPIRY.DAYS_AHEAD *
        E2E_WORKER_EXPIRY.MILLISECONDS_PER_DAY
  )
    .toISOString()
    .slice(0, E2E_WORKER_EXPIRY.DATE_LENGTH);

test.describe("External guide expiry screenshots", () => {
  test("captures an expired external guide and then the extended account", async ({
    page,
  }, testInfo) => {
    const guide = await createWorkerListFilterFixtureWorker(
      {
        baseRole: SUPABASE_WORK_AREA.OPERATIONS,
        expiresAt: E2E_WORKER_EXPIRY.EXPIRED_AT,
        fullName: E2E_WORKER_EXPIRY.FULL_NAME,
        isExternalGuide: true,
        mark: null,
      }
    );

    try {
      const areasPage = createWorkerAreasPage(page);
      await signInAsSeededWorker(page);
      await areasPage.goTo();
      await areasPage.search(guide.username);
      await expect(
        page.getByText(E2E_WORKER_EXPIRY.EXPIRED_NOTE)
      ).toBeVisible();
      await captureFullPage(
        page,
        E2E_WORKER_EXPIRY_SCREENSHOT_BASENAME.EXPIRED,
        testInfo.project.name
      );

      await areasPage
        .getExpiryDateInput(E2E_WORKER_EXPIRY.DATE_LABEL)
        .fill(buildFutureDate());
      await areasPage
        .getExtendButton(E2E_WORKER_EXPIRY.EXTEND_LABEL)
        .click();
      await expect(
        areasPage.getNotice(
          E2E_WORKER_EXPIRY.EXTENDED_NOTICE
        )
      ).toBeVisible();
      await captureFullPage(
        page,
        E2E_WORKER_EXPIRY_SCREENSHOT_BASENAME.EXTENDED,
        testInfo.project.name
      );
    } finally {
      await guide.remove();
    }
  });
});
