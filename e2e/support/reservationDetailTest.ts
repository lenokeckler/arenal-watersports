import { test } from "@playwright/test";
import type { ReservationDetailE2eFixtures } from "../models/ReservationDetailE2eFixtures.interface";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailFixture } from "./createReservationDetailFixture";
import { signInWithCredentials } from "./signInWithCredentials";

export const reservationDetailTest =
  test.extend<ReservationDetailE2eFixtures>({
    reservationFixture: async (
      { page },
      provideFixture
    ) => {
      const reservationFixture =
        await createReservationDetailFixture();
      try {
        await signInWithCredentials(
          page,
          reservationFixture.workerUsername,
          reservationFixture.workerPassword
        );
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
