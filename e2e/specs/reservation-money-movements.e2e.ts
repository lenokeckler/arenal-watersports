import { expect, type Locator } from "@playwright/test";
import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import { E2E_RESERVATION_DETAIL_FIXTURE } from "../constants/E2eReservationDetail.constants";
import {
  E2E_RESERVATION_MONEY_MOVEMENTS_ARIA as aria,
  E2E_RESERVATION_MONEY_MOVEMENTS_COPY as copy,
  E2E_RESERVATION_MONEY_MOVEMENTS_FIXTURE as fixture,
  E2E_RESERVATION_MONEY_MOVEMENTS_VALUES as values,
} from "../constants/E2eReservationMoneyMovements.constants";
import { createReservationMoneyMovementsPage } from "../pages/ReservationMoneyMovements.page";
import { reservationDetailTest } from "../support/reservationDetailTest";
import { seedReservationMoneyMovements } from "../support/seedReservationMoneyMovements";

const expectRowContains = async (
  row: Locator,
  expected: readonly string[]
): Promise<void> => {
  for (const text of [
    ...expected,
    copy.RECORDED_BY,
    E2E_RESERVATION_DETAIL_FIXTURE.WORKER_NAME,
  ]) {
    await expect(row).toContainText(text);
  }
};

reservationDetailTest(
  "lists charges and refunds folded and opens them with the button",
  async ({ page, reservationFixture }) => {
    await reservationFixture.clearDetails();
    const createdAt = await seedReservationMoneyMovements(
      reservationFixture.id
    );
    await page.reload();
    const movements =
      createReservationMoneyMovementsPage(page);
    const showToggle = movements.getToggle(
      copy.MOVEMENTS_SHOW
    );
    await expect(showToggle).toHaveAttribute(
      aria.EXPANDED_ATTRIBUTE,
      aria.COLLAPSED
    );
    await expect(movements.getRows()).toHaveCount(0);

    await showToggle.click();
    const hideToggle = movements.getToggle(
      copy.MOVEMENTS_HIDE
    );
    await expect(hideToggle).toHaveAttribute(
      aria.EXPANDED_ATTRIBUTE,
      aria.EXPANDED
    );
    const rows = movements.getRows();
    await expect(rows).toHaveCount(fixture.MOVEMENT_COUNT);
    await expectRowContains(rows.nth(0), [
      fixture.REFUND_AMOUNT_DISPLAY,
      values.CURRENCY.USD,
      copy.TYPE_REFUND,
      fixture.REFUND_REASON,
      copy.METHOD_NOT_APPLICABLE,
      formatReservationCalendarDateTime(createdAt.refund),
    ]);
    await expectRowContains(rows.nth(1), [
      fixture.EXTRA_TIME_AMOUNT_DISPLAY,
      values.CURRENCY.CRC,
      copy.TYPE_CHARGE,
      copy.EXTRA_TIME_CONCEPT,
      fixture.CARD,
      formatReservationCalendarDateTime(
        createdAt.extraTime
      ),
    ]);
    await expectRowContains(rows.nth(2), [
      fixture.TARIFF_AMOUNT_DISPLAY,
      values.CURRENCY.USD,
      copy.TYPE_CHARGE,
      copy.TARIFF_CONCEPT,
      fixture.CASH,
      formatReservationCalendarDateTime(createdAt.tariff),
    ]);
    expect(
      await movements.detailPage.hasHorizontalOverflow()
    ).toBe(false);

    await hideToggle.click();
    await expect(
      movements.getToggle(copy.MOVEMENTS_SHOW)
    ).toHaveAttribute(
      aria.EXPANDED_ATTRIBUTE,
      aria.COLLAPSED
    );
    await expect(movements.getRows()).toHaveCount(0);
  }
);

reservationDetailTest(
  "shows the empty message when nothing was recorded",
  async ({ page, reservationFixture }) => {
    await reservationFixture.clearDetails();
    await page.reload();

    const movements =
      createReservationMoneyMovementsPage(page);
    await expect(movements.getEmpty()).toBeVisible();
    await expect(
      movements.getToggle(copy.MOVEMENTS_SHOW)
    ).toHaveCount(0);
  }
);
