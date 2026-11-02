import { PAGINATION, PATHS } from "@/app/constants";
import {
  E2E_RESERVATION,
  E2E_RESERVATIONS_BY_WORKER_COPY,
} from "../constants/E2eReservationsByWorker.constants";
import { createReservationsByWorkerPage } from "../pages/ReservationsByWorker.page";
import { createWorkerAreasPage } from "../pages/WorkerAreas.page";
import { expect, test } from "../support/activeWorkerTest";
import { createReservationsByWorkerReservation } from "../support/createReservationsByWorkerReservation";
import { readSeededAdmin } from "../support/readSeededAdmin";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";
import type { E2eReservationsByWorkerReservation } from "../support/models/E2eReservationsByWorkerReservation.interface";

test.describe("Reservations by worker", () => {
  test("links to the report from worker administration", async ({
    page,
  }) => {
    await signInAsSeededWorker(page);
    const workerAreasPage = createWorkerAreasPage(page);
    await workerAreasPage.goTo();

    await expect(
      workerAreasPage.getReservationsReportLink()
    ).toHaveAttribute(
      "href",
      PATHS.ADMINISTRATION.RESERVATIONS_BY_WORKER
    );
  });

  test("shows the creator signature instead of the last updater", async ({
    activeWorker,
    page,
  }) => {
    const admin = await readSeededAdmin();
    const customerName = `${E2E_RESERVATION.CUSTOMER_PREFIX}-${activeWorker.username}`;
    const reservation =
      await createReservationsByWorkerReservation(
        activeWorker.id,
        admin.id,
        customerName
      );

    try {
      await signInAsSeededWorker(page);
      const reservationsPage =
        createReservationsByWorkerPage(page);
      await reservationsPage.goTo();

      await expect(
        reservationsPage.getHeading()
      ).toHaveText(E2E_RESERVATIONS_BY_WORKER_COPY.TITLE);
      const creator =
        reservationsPage.getCreatorInCustomerRecord(
          reservation.customerName,
          E2E_RESERVATION.FULL_NAME
        );

      while ((await creator.count()) === 0) {
        const nextPage = reservationsPage.getNextPage();

        if ((await nextPage.count()) === 0) {
          break;
        }

        await nextPage.click();
      }

      await expect(creator).toBeVisible();
    } finally {
      await reservation.remove();
    }
  });

  test("paginates the report on the server", async ({
    activeWorker,
    page,
  }) => {
    const admin = await readSeededAdmin();
    const reservations: E2eReservationsByWorkerReservation[] =
      [];

    try {
      for (
        let index = PAGINATION.DEFAULT_PAGE;
        index <
        PAGINATION.DEFAULT_PAGE_SIZE + PAGINATION.ONE_PAGE;
        index += PAGINATION.ONE_PAGE
      ) {
        reservations.push(
          await createReservationsByWorkerReservation(
            activeWorker.id,
            admin.id,
            `${E2E_RESERVATION.CUSTOMER_PREFIX}-${activeWorker.username}-${index}`
          )
        );
      }

      await signInAsSeededWorker(page);
      const reservationsPage =
        createReservationsByWorkerPage(page);
      await reservationsPage.goTo();
      await reservationsPage.getNextPage().click();

      await expect(
        reservationsPage.getPageIndicator()
      ).toBeVisible();
    } finally {
      await Promise.all(
        reservations.map((reservation) =>
          reservation.remove()
        )
      );
    }
  });

  test("redirects workers without administration access", async ({
    signedInPage,
  }) => {
    await createReservationsByWorkerPage(
      signedInPage
    ).goTo();

    await expect(signedInPage).toHaveURL(PATHS.BOARD);
  });
});
