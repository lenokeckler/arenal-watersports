import {
  PATHS,
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_RESULT,
  WORKER_ACCOUNT_STATE,
} from "@/app/constants";
import {
  WORKER_ACCOUNT_ACTION_LABEL,
  WORKER_ACCOUNT_NOTICE,
  WORKER_ACCOUNT_STATE_LABEL,
} from "@/app/features/administration/worker-areas/constants/WorkerAccountCopy.constants";
import { createProfilePage } from "../pages/Profile.page";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { expect, test } from "../support/activeWorkerTest";
import { expectServerSessionEnded } from "../support/expectServerSessionEnded";
import { signInAsActiveWorker } from "../support/signInAsActiveWorker";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

const ACTIVE_LABEL =
  WORKER_ACCOUNT_STATE_LABEL[WORKER_ACCOUNT_STATE.ACTIVE];
const BLOCKED_LABEL =
  WORKER_ACCOUNT_STATE_LABEL[
    WORKER_ACCOUNT_STATE.BLOCKED_BY_ADMINISTRATION
  ];

test.describe("Account lock", () => {
  test("administration blocks a signed-in worker, the session ends at once, and unlocking lets the worker in again", async ({
    activeWorker,
    page,
    secondDevice,
  }) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await areasPage.search(activeWorker.username);

    await areasPage.press(
      ACTIVE_LABEL,
      WORKER_ACCOUNT_ACTION_LABEL[
        WORKER_ACCOUNT_ACTION.BLOCK
      ].label
    );
    await expect(
      areasPage.getNotice(
        WORKER_ACCOUNT_NOTICE[
          WORKER_ACCOUNT_RESULT.BLOCKED
        ] ?? ""
      )
    ).toBeVisible();
    await expect(
      areasPage.getMessage(BLOCKED_LABEL)
    ).toBeVisible();
    await expectServerSessionEnded(activeWorker.id);
    await createProfilePage(secondDevice.page).goTo();
    await expect(secondDevice.page).toHaveURL(
      PATHS.ACCESS.LOGIN
    );

    await areasPage.press(
      BLOCKED_LABEL,
      WORKER_ACCOUNT_ACTION_LABEL[
        WORKER_ACCOUNT_ACTION.UNLOCK
      ].label
    );
    await expect(
      areasPage.getNotice(
        WORKER_ACCOUNT_NOTICE[
          WORKER_ACCOUNT_RESULT.UNLOCKED
        ] ?? ""
      )
    ).toBeVisible();
    await signInAsActiveWorker(
      secondDevice.page,
      activeWorker
    );
    await expect(secondDevice.page).toHaveURL(PATHS.HOME);
  });
});
