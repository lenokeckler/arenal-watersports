import {
  E2E_GENERAL_MANAGER_LABEL,
  E2E_GENERAL_MANAGER_PUT_NOTICE,
  E2E_GUIDE_LABEL,
  E2E_GUIDE_PUT_NOTICE,
  E2E_WORKER_MARKS_SCREENSHOT_BASENAME,
} from "../constants/E2eWorkerMarks.constants";
import { E2E_WORKER_AREAS_COPY } from "../constants/E2eWorkerAreas.constants";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Worker marks screenshots", () => {
  test("captures a worker without marks and then with both marks", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await areasPage.search(activeWorker.username);
    await expect(
      areasPage.getMessage(
        E2E_WORKER_AREAS_COPY.MARKS_TITLE
      )
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_WORKER_MARKS_SCREENSHOT_BASENAME.NO_MARKS,
      testInfo.project.name
    );

    await areasPage.press(
      E2E_GUIDE_LABEL,
      E2E_WORKER_AREAS_COPY.MARK_GRANT
    );
    await expect(
      areasPage.getNotice(E2E_GUIDE_PUT_NOTICE)
    ).toBeVisible();
    await areasPage.press(
      E2E_GENERAL_MANAGER_LABEL,
      E2E_WORKER_AREAS_COPY.MARK_GRANT
    );
    await expect(
      areasPage.getNotice(E2E_GENERAL_MANAGER_PUT_NOTICE)
    ).toBeVisible();
    await captureFullPage(
      page,
      E2E_WORKER_MARKS_SCREENSHOT_BASENAME.BOTH_MARKS,
      testInfo.project.name
    );
  });
});
