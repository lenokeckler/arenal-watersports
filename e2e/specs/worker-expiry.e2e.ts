import { SUPABASE_WORK_AREA } from "@/app/constants";
import { E2E_WORKER_EXPIRY } from "../constants/E2eWorkerExpiry.constants";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { createWorkerListFilterFixtureWorker } from "../support/createWorkerListFilterFixtureWorker";
import { readWorkerExpiresAt } from "../support/readWorkerExpiresAt";
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

const createExpiredGuide = () =>
  createWorkerListFilterFixtureWorker({
    baseRole: SUPABASE_WORK_AREA.OPERATIONS,
    expiresAt: E2E_WORKER_EXPIRY.EXPIRED_AT,
    fullName: E2E_WORKER_EXPIRY.FULL_NAME,
    isExternalGuide: true,
    mark: null,
  });

test.describe("External guide expiry", () => {
  test("administration extends the expiry of an expired external guide", async ({
    page,
  }) => {
    const guide = await createExpiredGuide();

    try {
      const areasPage = createWorkerAreasPage(page);
      await signInAsSeededWorker(page);
      await areasPage.goTo();
      await areasPage.search(guide.username);
      await expect(
        page.getByText(E2E_WORKER_EXPIRY.EXPIRED_NOTE)
      ).toBeVisible();

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
      await expect(
        page.getByText(E2E_WORKER_EXPIRY.EXPIRES_NOTE)
      ).toBeVisible();
      await expect(
        page.getByText(E2E_WORKER_EXPIRY.EXPIRED_NOTE)
      ).toHaveCount(0);
      expect(
        Date.parse(
          await readWorkerExpiresAt(guide.username)
        )
      ).toBeGreaterThan(Date.now());
    } finally {
      await guide.remove();
    }
  });

  test("keeps the expiry when the new date is not after the current one", async ({
    page,
  }) => {
    const guide = await createExpiredGuide();

    try {
      const areasPage = createWorkerAreasPage(page);
      await signInAsSeededWorker(page);
      await areasPage.goTo();
      await areasPage.search(guide.username);

      await areasPage
        .getExpiryDateInput(E2E_WORKER_EXPIRY.DATE_LABEL)
        .fill(E2E_WORKER_EXPIRY.PAST_DATE);
      await areasPage
        .getExtendButton(E2E_WORKER_EXPIRY.EXTEND_LABEL)
        .click();

      await expect(
        areasPage.getAlert(
          E2E_WORKER_EXPIRY.INVALID_DATE_ERROR
        )
      ).toBeVisible();
      expect(
        Date.parse(
          await readWorkerExpiresAt(guide.username)
        )
      ).toBeLessThan(Date.now());
    } finally {
      await guide.remove();
    }
  });
});
