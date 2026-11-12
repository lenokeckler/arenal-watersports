import {
  CURRENCY_CODE,
  RESERVATION_STATUS,
} from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import {
  E2E_RESERVATION_CHARGE as values,
  E2E_RESERVATION_CHARGE_SEED as seed,
} from "../constants/E2eReservationCharge.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationChargePage } from "../pages/ReservationCharge.page";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailChargePage } from "../pages/ReservationDetailCharge.page";
import { expect, test } from "../support/activeWorkerTest";
import { calculateExpectedChargeProposal } from "../support/calculateExpectedChargeProposal";
import { createReservationChargeFixture as seedCharge } from "../support/createReservationChargeFixture";
import { readReservationChargeState } from "../support/readReservationChargeState";
import { readReservationChargeTariff } from "../support/readReservationChargeTariff";
import { removeReservationChargeFixtures } from "../support/removeReservationChargeFixtures";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

const readExpectedProposal = async (
  workerId: string,
  reservationId: string
): Promise<number> => {
  const tariff = await readReservationChargeTariff(
    workerId,
    reservationId
  );
  const peopleCount = Number(values.PEOPLE_COUNT);
  const expected = calculateExpectedChargeProposal(
    tariff.amountUsd
  );
  expect(tariff.amountUsd).toBe(Number(seed.tariff_usd));
  expect(tariff.amountCrc).toBe(Number(seed.tariff_crc));
  expect(expected).not.toBe(tariff.amountUsd * peopleCount);
  expect(expected).not.toBe(tariff.amountUsd);

  return expected;
};

test.describe("Reservation charge", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationChargeFixtures(activeWorker);
  });

  test("records the proposed amount of the whole reservation from its detail, under the worker who made it", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCharge(
      activeWorker.id,
      testInfo.project.name
    );
    const proposal = await readExpectedProposal(
      activeWorker.id,
      reservation.id
    );
    const detail = createReservationDetailPage(page);
    const charge = createReservationChargePage(page);

    await detail.goTo(reservation.id);
    await createReservationDetailChargePage(page)
      .getChargeLink(reservation.code)
      .click();
    await expect(charge.getAmount()).toHaveValue(
      String(proposal)
    );
    await charge.fillPaymentMethod(values.PAYMENT_METHOD);
    await charge.submit();

    await expect(charge.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    await expect(
      charge.getText(copy.RECORDED_BY(E2E_WORKER.FULL_NAME))
    ).toBeVisible();
    await expect(
      charge.getText(
        formatMoney({
          amount: proposal,
          currency: CURRENCY_CODE.USD,
        })
      )
    ).toBeVisible();
    await expect
      .poll(() =>
        readReservationChargeState(
          activeWorker.id,
          reservation.id
        )
      )
      .toEqual({
        agreedAmountCrc: null,
        agreedAmountUsd: null,
        amount: proposal,
        charges: 1,
        currency: CURRENCY_CODE.USD,
        isAuthor: true,
        kind: values.CHARGE_KIND,
        method: values.PAYMENT_METHOD,
        pricingRows: 1,
        recordedByName: E2E_WORKER.FULL_NAME,
      });
  });

  test("records an adjusted amount and keeps it as the agreed price", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCharge(
      activeWorker.id,
      testInfo.project.name
    );
    const proposal = await readExpectedProposal(
      activeWorker.id,
      reservation.id
    );
    const charge = createReservationChargePage(page);
    const adjusted = Number(values.ADJUSTED_AMOUNT);

    expect(proposal).not.toBe(adjusted);
    await charge.goTo(reservation.id);
    await expect(charge.getAmount()).toHaveValue(
      String(proposal)
    );
    await charge.fillAmount(values.ADJUSTED_AMOUNT);
    await charge.fillPaymentMethod(values.PAYMENT_METHOD);
    await charge.submit();

    await expect(charge.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    await expect
      .poll(async () => {
        const state = await readReservationChargeState(
          activeWorker.id,
          reservation.id
        );

        return [
          state.amount,
          state.agreedAmountUsd,
          state.charges,
        ];
      })
      .toEqual([adjusted, adjusted, 1]);

    await charge.getBackLink().click();
    await expect(
      createReservationDetailChargePage(
        page
      ).getChargeSection()
    ).toContainText(
      formatMoney({
        amount: adjusted,
        currency: CURRENCY_CODE.USD,
      })
    );
  });

  test("records a charge on a closed reservation", async ({
    activeWorker,
    page,
  }, testInfo) => {
    const reservation = await seedCharge(
      activeWorker.id,
      testInfo.project.name,
      RESERVATION_STATUS.CLOSED
    );
    const proposal = await readExpectedProposal(
      activeWorker.id,
      reservation.id
    );
    const charge = createReservationChargePage(page);

    await createReservationDetailPage(page).goTo(
      reservation.id
    );
    await createReservationDetailChargePage(page)
      .getChargeLink(reservation.code)
      .click();
    await charge.fillPaymentMethod(values.PAYMENT_METHOD);
    await charge.submit();

    await expect(charge.getStatus()).toHaveText(
      copy.SUCCESS(reservation.code),
      submitWait
    );
    await expect
      .poll(async () => {
        const state = await readReservationChargeState(
          activeWorker.id,
          reservation.id
        );

        return [state.amount, state.charges];
      })
      .toEqual([proposal, 1]);
  });
});
