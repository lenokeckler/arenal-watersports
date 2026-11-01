import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { PATHS } from "@/app/constants";
import {
  E2E_RESERVATION_DETAIL_COPY as copy,
  E2E_RESERVATION_DETAIL_FIXTURE as fixture,
} from "../constants/E2eReservationDetail.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { reservationDetailTest } from "../support/reservationDetailTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

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

test("redirects an unauthenticated visitor to sign in", async ({
  page,
}) => {
  await page.goto(PATHS.RESERVATIONS.DETAIL(randomUUID()));

  await expect(page).toHaveURL(/\/access\/login/);
});

test("redirects a signed-in worker without Reservations access", async ({
  page,
}) => {
  await signInAsSeededWorker(page);
  await page.goto(PATHS.RESERVATIONS.DETAIL(randomUUID()));

  await expect(page).toHaveURL(PATHS.HOME);
});

reservationDetailTest(
  "shows not found for malformed and nonexistent reservation ids",
  async ({ page, reservationFixture }) => {
    const detailPage = createReservationDetailPage(page);
    await expect(page).toHaveURL(
      PATHS.RESERVATIONS.DETAIL(reservationFixture.id)
    );

    await detailPage.goTo("not-a-reservation-id");
    await expect(
      page.getByText(copy.MISSING_RESERVATION, {
        exact: true,
      })
    ).toBeVisible();

    await detailPage.goTo(randomUUID());
    await expect(
      page.getByText(copy.MISSING_RESERVATION, {
        exact: true,
      })
    ).toBeVisible();
  }
);

reservationDetailTest(
  "identifies a cancelled reservation",
  async ({ page, reservationFixture }) => {
    await reservationFixture.cancel();
    await page.reload();

    await expect(
      page.getByText(copy.CANCELLED, { exact: true })
    ).toBeVisible();
  }
);

reservationDetailTest(
  "identifies a split child whose charge belongs to its parent",
  async ({ page, reservationFixture }) => {
    const childId =
      await reservationFixture.createSplitChild();
    await createReservationDetailPage(page).goTo(childId);

    await expect(
      page.getByText(copy.PARENT_CHARGE, { exact: true })
    ).toBeVisible();
  }
);

reservationDetailTest(
  "shows empty states when the reservation has no related details",
  async ({ page, reservationFixture }) => {
    await reservationFixture.clearDetails();
    await page.reload();

    const detailPage = createReservationDetailPage(page);
    await expect(
      detailPage.getDispatchSection()
    ).toContainText(copy.MISSING_DISPATCHES);
    await expect(
      detailPage.getEquipmentSection()
    ).toContainText(copy.MISSING_EQUIPMENT);
    await expect(
      detailPage.getExtrasSection()
    ).toContainText(copy.MISSING_EXTRAS);
    await expect(
      detailPage.getGuideSection()
    ).toContainText(copy.MISSING_GUIDES);
  }
);
