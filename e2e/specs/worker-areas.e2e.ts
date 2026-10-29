import { PATHS } from "@/app/constants";
import {
  E2E_RESERVATIONS_GRANTED_NOTICE,
  E2E_RESERVATIONS_LABEL,
  E2E_RESERVATIONS_REVOKED_NOTICE,
  E2E_UNKNOWN_USERNAME,
  E2E_WORKER_AREAS_COPY,
} from "../constants/E2eWorkerAreas.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { expect, test } from "../support/activeWorkerTest";
import { countReservationsArea } from "../support/countReservationsArea";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Worker areas", () => {
  test("administration enables reservas on a worker of operaciones and removes it again", async ({
    activeWorker,
    page,
  }) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();
    await areasPage.search(activeWorker.username);
    await expect(
      areasPage.getMessage(
        E2E_WORKER_AREAS_COPY.AREA_IS_BASE
      )
    ).toBeVisible();

    await areasPage.press(
      E2E_RESERVATIONS_LABEL,
      E2E_WORKER_AREAS_COPY.GRANT
    );
    await expect(
      areasPage.getNotice(E2E_RESERVATIONS_GRANTED_NOTICE)
    ).toBeVisible();
    await expect(
      areasPage.getMessage(
        E2E_WORKER_AREAS_COPY.AREA_ENABLED
      )
    ).toBeVisible();
    expect(
      await countReservationsArea(activeWorker.id)
    ).toBe(E2E_COUNT.ONE);

    await areasPage.press(
      E2E_RESERVATIONS_LABEL,
      E2E_WORKER_AREAS_COPY.REVOKE
    );
    await expect(
      areasPage.getNotice(E2E_RESERVATIONS_REVOKED_NOTICE)
    ).toBeVisible();
    expect(
      await countReservationsArea(activeWorker.id)
    ).toBe(E2E_COUNT.NONE);
  });

  test("says so for a username that does not exist", async ({
    page,
  }) => {
    const areasPage = createWorkerAreasPage(page);
    await signInAsSeededWorker(page);
    await areasPage.goTo();

    await areasPage.search(E2E_UNKNOWN_USERNAME);

    await expect(
      areasPage.getMessage(E2E_WORKER_AREAS_COPY.NOT_FOUND)
    ).toBeVisible();
  });

  test("sends a worker who is not administration to the home", async ({
    signedInPage: page,
  }) => {
    await createWorkerAreasPage(page).goTo();

    await expect(page).toHaveURL(PATHS.HOME);
  });
});
