import { expect } from "@playwright/test";
import {
  E2E_RESERVATION_DETAIL_COPY as copy,
  E2E_RESERVATION_DETAIL_FIXTURE as fixture,
} from "../constants/E2eReservationDetail.constants";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { reservationDetailTest } from "../support/reservationDetailTest";

reservationDetailTest(
  "shows equipment, extras, guides, charges, and responsive layout",
  async ({ page, reservationFixture }) => {
    const detailPage = createReservationDetailPage(page);
    await expect(
      detailPage.getEquipmentSection()
    ).toContainText(fixture.FIRST_UNIT_CODE);
    await expect(
      detailPage.getEquipmentSection()
    ).toContainText(fixture.SECOND_UNIT_CODE);
    await expect(
      detailPage.getExtrasSection()
    ).toContainText(fixture.EXTRA_NAME);
    await expect(
      detailPage.getGuideSection()
    ).toContainText(reservationFixture.guideName);
    const charges = detailPage.getChargeSection();
    await expect(charges).toContainText(copy.PAID);
    await expect(
      detailPage.getChargeAmountRow(copy.AMOUNT_TARGET)
    ).toContainText(fixture.AGREED_AMOUNT_DISPLAY);
    await expect(
      detailPage.getChargeAmountRow(
        copy.AMOUNT_CHARGED_GROSS
      )
    ).toContainText(fixture.GROSS_CHARGED_AMOUNT_DISPLAY);
    await expect(
      detailPage.getChargeAmountRow(copy.AMOUNT_CHARGED_NET)
    ).toContainText(fixture.NET_CHARGED_AMOUNT_DISPLAY);
    await expect(charges).toContainText(
      copy.EXTRA_TIME_CHARGES
    );
    await expect(charges).toContainText(
      fixture.EXTRA_TIME_AMOUNT_DISPLAY
    );
    await expect(charges).toContainText(copy.REFUNDS);
    await expect(
      detailPage.getRefundSection()
    ).toContainText(fixture.REFUND_AMOUNT_DISPLAY);
    expect(await detailPage.hasHorizontalOverflow()).toBe(
      false
    );
  }
);

reservationDetailTest(
  "identifies the reservation creator and latest modifier",
  async ({ page, reservationFixture }) => {
    const audit =
      createReservationDetailPage(page).getAuditSection();
    await expect(audit).toContainText(copy.CREATED_BY);
    await expect(audit).toContainText(
      reservationFixture.createdByName
    );
    await expect(audit).toContainText(copy.MODIFIED_BY);
    await expect(audit).toContainText(
      reservationFixture.guideName
    );
  }
);

reservationDetailTest(
  "shows a returned dispatched group's departure and arrival times",
  async ({ page, reservationFixture }) => {
    const detailPage = createReservationDetailPage(page);
    const returnedGroup = detailPage.getDispatchGroup(
      reservationFixture.firstCategoryName
    );
    await expect(returnedGroup).toContainText(
      copy.ACTUAL_DEPARTURE
    );
    await expect(returnedGroup).toContainText(
      fixture.FIRST_DEPARTURE_DISPLAY
    );
    await expect(returnedGroup).toContainText(
      copy.EXPECTED_RETURN
    );
    await expect(returnedGroup).toContainText(
      fixture.FIRST_RETURN_DISPLAY
    );
    await expect(returnedGroup).toContainText(
      copy.ACTUAL_ARRIVAL
    );
    await expect(returnedGroup).toContainText(
      fixture.FIRST_ARRIVAL_DISPLAY
    );
  }
);

reservationDetailTest(
  "shows an open dispatched group's departure and expected return",
  async ({ page, reservationFixture }) => {
    const detailPage = createReservationDetailPage(page);
    const openGroup = detailPage.getDispatchGroup(
      reservationFixture.secondCategoryName
    );
    await expect(openGroup).toContainText(
      copy.ACTUAL_DEPARTURE
    );
    await expect(openGroup).toContainText(
      fixture.SECOND_DEPARTURE_DISPLAY
    );
    await expect(openGroup).toContainText(
      copy.EXPECTED_RETURN
    );
    await expect(openGroup).toContainText(
      fixture.SECOND_RETURN_DISPLAY
    );
    await expect(openGroup).toContainText(
      copy.MISSING_ARRIVAL
    );
  }
);
