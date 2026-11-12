import {
  PATHS,
  WORKER_ACCOUNT_ACTION,
  WORKER_ACCOUNT_STATE,
} from "@/app/constants";
import {
  WORKER_ACCOUNT_ACTION_LABEL,
  WORKER_ACCOUNT_COPY,
  WORKER_ACCOUNT_STATE_LABEL,
} from "@/app/features/administration/worker-areas/constants/WorkerAccountCopy.constants";
import { createLoginPage } from "../pages/Login.page";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { createWorkerRegistrationPage } from "../pages/WorkerRegistration.page";
import { expect, test } from "../support/activeWorkerTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Rehire an account", () => {
  test("a retired worker comes back with the same account and must change the new temporary password", async ({
    activeWorker,
    browser,
    page,
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
      areasPage.getMessage(
        WORKER_ACCOUNT_STATE_LABEL[
          WORKER_ACCOUNT_STATE.RETIRED
        ]
      )
    ).toBeVisible();

    await page
      .getByRole("button", {
        name: WORKER_ACCOUNT_COPY.REHIRE,
      })
      .click();
    await expect(
      areasPage.getMessage(WORKER_ACCOUNT_COPY.REHIRE_DONE)
    ).toBeVisible();
    const temporaryPassword =
      await createWorkerRegistrationPage(page)
        .getTemporaryPassword()
        .innerText();

    const workerContext = await browser.newContext();
    const workerPage = await workerContext.newPage();
    const loginPage = createLoginPage(workerPage);
    await loginPage.goTo();
    await loginPage.fillUsername(activeWorker.username);
    await loginPage.fillPassword(temporaryPassword);
    await loginPage.submit();
    await expect(workerPage).toHaveURL(
      PATHS.ACCESS.FIRST_SIGN_IN
    );
    await workerContext.close();

    await areasPage.search(activeWorker.username);
    await expect(
      areasPage.getMessage(
        WORKER_ACCOUNT_STATE_LABEL[
          WORKER_ACCOUNT_STATE.ACTIVE
        ]
      )
    ).toBeVisible();
  });
});
