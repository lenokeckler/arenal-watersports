import {
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_STATE,
} from "@/app/constants";
import {
  WORKER_ACCOUNT_ACTION_LABEL,
  WORKER_ACCOUNT_COPY,
  WORKER_ACCOUNT_STATE_LABEL,
} from "@/app/features/administration/worker-areas/constants/WorkerAccountCopy.constants";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

const SCREENSHOT = {
  ACTIVE: "06-worker-account-active",
  BLOCKED: "07-worker-account-blocked",
  TEMPORARY_PASSWORD:
    "08-worker-account-temporary-password",
  RETIRED: "09-worker-account-retired",
  REHIRED: "10-worker-account-rehired",
} as const;

test.describe("Worker account screenshots", () => {
  test("captures the account states and actions", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const areasPage = createWorkerAreasPage(page);
    const capture = (name: string) =>
      captureFullPage(page, name, testInfo.project.name);
    const press = (
      stateLabel: string,
      buttonLabel: string
    ) => areasPage.press(stateLabel, buttonLabel);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await areasPage.search(activeWorker.username);
    await expect(
      areasPage.getMessage(WORKER_ACCOUNT_COPY.TITLE)
    ).toBeVisible();
    await capture(SCREENSHOT.ACTIVE);

    await press(
      WORKER_ACCOUNT_STATE_LABEL[
        WORKER_ACCOUNT_STATE.ACTIVE
      ],
      WORKER_ACCOUNT_ACTION_LABEL[
        WORKER_ACCOUNT_ACTION.BLOCK
      ].label
    );
    await expect(
      areasPage.getMessage(
        WORKER_ACCOUNT_STATE_LABEL[
          WORKER_ACCOUNT_STATE.BLOCKED_BY_ADMINISTRATION
        ]
      )
    ).toBeVisible();
    await capture(SCREENSHOT.BLOCKED);

    await page
      .getByRole("button", {
        name: WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD,
      })
      .click();
    await expect(
      areasPage.getMessage(
        WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD_DONE
      )
    ).toBeVisible();
    await capture(SCREENSHOT.TEMPORARY_PASSWORD);

    await press(
      WORKER_ACCOUNT_STATE_LABEL[
        WORKER_ACCOUNT_STATE.BLOCKED_BY_ADMINISTRATION
      ],
      WORKER_ACCOUNT_ACTION_LABEL[
        WORKER_ACCOUNT_ACTION.RETIRE
      ].label
    );
    await expect(
      areasPage.getMessage(
        WORKER_ACCOUNT_STATE_LABEL[
          WORKER_ACCOUNT_STATE.RETIRED
        ]
      )
    ).toBeVisible();
    await capture(SCREENSHOT.RETIRED);

    await page
      .getByRole("button", {
        name: WORKER_ACCOUNT_COPY.REHIRE,
      })
      .click();
    await expect(
      areasPage.getMessage(WORKER_ACCOUNT_COPY.REHIRE_DONE)
    ).toBeVisible();
    await capture(SCREENSHOT.REHIRED);
  });
});
