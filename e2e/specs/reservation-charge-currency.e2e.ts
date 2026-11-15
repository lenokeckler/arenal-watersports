import { CURRENCY_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_CHARGE_UI_COPY as ui } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeUiCopy.constants";
import { formatReservationDetailAmount } from "@/app/features/reservations/reservation-detail/utils/formatReservationDetailAmount";
import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_RESERVATION_CHARGE_CURRENCY as currencyValues } from "../constants/E2eReservationChargeCurrency.constants";
import { createReservationChargePage } from "../pages/ReservationCharge.page";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailChargePage } from "../pages/ReservationDetailCharge.page";
import { expect, test } from "../support/activeWorkerTest";
import { createUsdOnlyChargeFixture } from "../support/createUsdOnlyChargeFixture";
import { readReservationChargeParts } from "../support/readReservationChargeParts";
import { recordChargeInCurrency } from "../support/recordChargeInCurrency";
import { removeUsdOnlyChargeFixture } from "../support/removeUsdOnlyChargeFixture";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test.describe("Reservation charge in the entered currency", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  let categoryName: NullableRef<string> = null;

  test.beforeEach(async ({ activeWorker, page }) => {
    categoryName = null;
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    if (categoryName !== null) {
      await removeUsdOnlyChargeFixture(
        activeWorker,
        categoryName
      );
    }
  });

  test("offers colones without a catalog tariff and records the amount in colones", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await createUsdOnlyChargeFixture(
      activeWorker.id,
      testInfo.project.name
    );
    categoryName = reservation.categoryName;
    const charge = createReservationChargePage(page);
    await charge.goTo(reservation.id);

    await expect(
      charge.getCurrencyLabel(CURRENCY_CODE.USD)
    ).toBeVisible();
    await expect(
      charge.getCurrencyLabel(CURRENCY_CODE.CRC)
    ).toBeVisible();
    await expect(
      charge.getText(ui.NO_PROPOSAL_LINE[CURRENCY_CODE.CRC])
    ).toBeVisible();

    await recordChargeInCurrency(
      charge,
      reservation,
      CURRENCY_CODE.CRC,
      currencyValues.CRC_AMOUNT
    );

    await expect
      .poll(
        async () =>
          (
            await readReservationChargeParts(
              activeWorker.id,
              reservation.id
            )
          ).charges
      )
      .toEqual([
        {
          amount: Number(currencyValues.CRC_AMOUNT),
          currency: CURRENCY_CODE.CRC,
          isAuthor: true,
          kind: values.CHARGE_KIND,
          method: values.PAYMENT_METHOD,
        },
      ]);
  });

  test("shows each currency on its own line and accumulates charges per currency", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await createUsdOnlyChargeFixture(
      activeWorker.id,
      testInfo.project.name
    );
    categoryName = reservation.categoryName;
    const charge = createReservationChargePage(page);
    const detailCharge =
      createReservationDetailChargePage(page);

    await recordChargeInCurrency(
      charge,
      reservation,
      CURRENCY_CODE.CRC,
      currencyValues.CRC_AMOUNT
    );
    await recordChargeInCurrency(
      charge,
      reservation,
      CURRENCY_CODE.CRC,
      currencyValues.CRC_EXTRA_AMOUNT
    );
    await recordChargeInCurrency(
      charge,
      reservation,
      CURRENCY_CODE.USD,
      currencyValues.USD_AMOUNT
    );
    await createReservationDetailPage(page).goTo(
      reservation.id
    );

    await expect(
      detailCharge.getChargedGross(CURRENCY_CODE.CRC)
    ).toHaveText(
      formatReservationDetailAmount(
        currencyValues.CRC_TOTAL,
        CURRENCY_CODE.CRC
      )
    );
    await expect(
      detailCharge.getChargedGross(CURRENCY_CODE.USD)
    ).toHaveText(
      formatReservationDetailAmount(
        Number(currencyValues.USD_AMOUNT),
        CURRENCY_CODE.USD
      )
    );
  });
});
