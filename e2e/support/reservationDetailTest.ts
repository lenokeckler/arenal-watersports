import { test } from "@playwright/test";
import type { ReservationDetailE2eFixtures } from "../models/ReservationDetailE2eFixtures.interface";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailFixture } from "./createReservationDetailFixture";
import { signInAsSeededWorker } from "./signInAsSeededWorker";

export const reservationDetailTest =
  test.extend<ReservationDetailE2eFixtures>({
    reservationFixture: async (
      { page },
      provideFixture
    ) => {
      const reservationFixture =
        await createReservationDetailFixture();
      try {
        await signInAsSeededWorker(page);
        await createReservationDetailPage(page).goTo(
          reservationFixture.id
        );
        await provideFixture(reservationFixture);
      } finally {
        try {
          await page.context().clearCookies();
        } finally {
          await reservationFixture.cleanup();
        }
      }
    },
  });
