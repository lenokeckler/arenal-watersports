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
import { WORKER_AREAS_COPY } from "@/app/features/administration/worker-areas/constants/WorkerAreasCopy.constants";
import { createLoginPage } from "../pages/Login.page";
import { createProfilePage } from "../pages/Profile.page";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { expect, test } from "../support/activeWorkerTest";
import { expectServerSessionEnded } from "../support/expectServerSessionEnded";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Retire an account", () => {
  test("administration retires a signed-in worker: the session ends and the account cannot sign in, but stays findable", async ({
    activeWorker,
    page,
    secondDevice,
  }) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await areasPage.search(activeWorker.username);

    await areasPage.press(
      WORKER_ACCOUNT_STATE_LABEL[
        WORKER_ACCOUNT_STATE.ACTIVE
      ],
      WORKER_ACCOUNT_ACTION_LABEL[
        WORKER_ACCOUNT_ACTION.RETIRE
      ].label
    );
    await expect(
      areasPage.getNotice(
        WORKER_ACCOUNT_NOTICE[
          WORKER_ACCOUNT_RESULT.RETIRED
        ] ?? ""
      )
    ).toBeVisible();
    await expect(
      areasPage.getMessage(
        WORKER_ACCOUNT_STATE_LABEL[
          WORKER_ACCOUNT_STATE.RETIRED
        ]
      )
    ).toBeVisible();
    await expect(
      areasPage.getMessage(WORKER_AREAS_COPY.AREAS_TITLE)
    ).toHaveCount(0);
    await expectServerSessionEnded(activeWorker.id);

    await createProfilePage(secondDevice.page).goTo();
    await expect(secondDevice.page).toHaveURL(
      PATHS.ACCESS.LOGIN
    );
    const loginPage = createLoginPage(secondDevice.page);
    await loginPage.fillUsername(activeWorker.username);
    await loginPage.fillPassword(activeWorker.password);
    await loginPage.submit();
    await expect(
      secondDevice.page.getByRole("alert")
    ).toBeVisible();
    await expect(secondDevice.page).toHaveURL(
      PATHS.ACCESS.LOGIN
    );
  });
});
