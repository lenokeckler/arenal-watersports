import { expect } from "@playwright/test";
import {
  E2E_RESERVATION_DETAIL_COPY as copy,
  E2E_RESERVATION_DETAIL_FIXTURE as fixture,
} from "../constants/E2eReservationDetail.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { reservationDetailTest } from "../support/reservationDetailTest";

reservationDetailTest(
  "shows all reservation overview fields",
  async ({ page, reservationFixture }) => {
    const detailPage = createReservationDetailPage(page);
    const overview = detailPage.getOverview();
    await expect(
      detailPage.getReservationHeading(
        reservationFixture.customerName
      )
    ).toBeVisible();
    await expect(
      detailPage.getReservationContent()
    ).toContainText(copy.TOUR);
    await expect(
      detailPage.getReservationContent()
    ).toContainText(copy.DISPATCHED);
    await expect(overview).toContainText(
      copy.RESERVATION_DATE
    );
    await expect(overview).toContainText(
      fixture.OVERVIEW_DATE_DISPLAY
    );
    await expect(overview).toContainText(copy.DURATION);
    await expect(overview).toContainText(
      fixture.DURATION_DISPLAY
    );
    await expect(overview).toContainText(copy.PEOPLE);
    await expect(overview).toContainText(
      fixture.PEOPLE_DISPLAY
    );
    await expect(overview).toContainText(copy.CUSTOMER);
    await expect(overview).toContainText(
      reservationFixture.customerName
    );
  }
);
