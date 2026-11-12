import {
  E2E_RESERVATIONS_GRANTED_NOTICE,
  E2E_RESERVATIONS_LABEL,
  E2E_WORKER_AREAS_COPY,
  E2E_WORKER_AREAS_SCREENSHOT_BASENAME,
} from "../constants/E2eWorkerAreas.constants";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Worker areas screenshots", () => {
  test("captures the lookup", async ({
    page,
  }, testInfo) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await expect(areasPage.getHeading()).toBeVisible();

    await captureFullPage(
      page,
      E2E_WORKER_AREAS_SCREENSHOT_BASENAME.LOOKUP,
      testInfo.project.name
    );
  });

  test("captures a worker and then the area enabled", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await areasPage.search(activeWorker.username);
    await expect(
      areasPage.getMessage(
        E2E_WORKER_AREAS_COPY.AREA_IS_BASE
      )
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_WORKER_AREAS_SCREENSHOT_BASENAME.WORKER,
      testInfo.project.name
    );

    await areasPage.press(
      E2E_RESERVATIONS_LABEL,
      E2E_WORKER_AREAS_COPY.GRANT
    );
    await expect(
      areasPage.getNotice(E2E_RESERVATIONS_GRANTED_NOTICE)
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_WORKER_AREAS_SCREENSHOT_BASENAME.GRANTED,
      testInfo.project.name
    );
  });
});
