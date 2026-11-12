import { PATHS } from "@/app/constants";
import { WORKER_ACCOUNT_COPY } from "@/app/features/administration/worker-areas/constants/WorkerAccountCopy.constants";
import { createLoginPage } from "../pages/Login.page";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { createWorkerRegistrationPage } from "../pages/WorkerRegistration.page";
import { expect, test } from "../support/activeWorkerTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Temporary password", () => {
  test("a worker without a personal email gets a temporary password and must change it on entering", async ({
    activeWorker,
    browser,
    page,
  }) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await areasPage.search(activeWorker.username);

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
  });

  test.describe("with a personal email", () => {
    test.use({ personalEmail: "celso.rojas@correo.cr" });

    test("sends the worker to the PIN instead", async ({
      activeWorker,
      page,
    }) => {
      const areasPage = createWorkerAreasPage(page);
      await signInAsSeededWorker(page);
      await areasPage.goTo();
      await areasPage.search(activeWorker.username);

      await expect(
        areasPage.getMessage(
          WORKER_ACCOUNT_COPY.HAS_PERSONAL_EMAIL_NOTE
        )
      ).toBeVisible();
      await expect(
        page.getByRole("button", {
          name: WORKER_ACCOUNT_COPY.TEMPORARY_PASSWORD,
        })
      ).toHaveCount(0);
    });
  });
});
