import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import { RESERVATION_DEPOSIT_FORM_COPY as copy } from "@/app/features/reservations/reservation-deposit/constants/ReservationDepositFormCopy.constants";
import { RESERVATION_DEPOSIT_UNAVAILABLE_COPY as unavailable } from "@/app/features/reservations/reservation-deposit/constants/ReservationDepositUnavailableCopy.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as validation } from "@/app/features/reservations/reservation-deposit/constants/ReservationDepositValidationCopy.constants";
import { RESERVATION_DETAIL_CHARGES_COPY as detailCopy } from "@/app/features/reservations/reservation-detail/constants/ReservationDetailChargesCopy.constants";
import { formatReservationDetailAmount } from "@/app/features/reservations/reservation-detail/utils/formatReservationDetailAmount";
import { resolveReservationDepositPath } from "@/app/utils/reservations/resolveReservationDepositPath";
import { E2E_RESERVATION_DEPOSIT as values } from "../constants/E2eReservationDeposit.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { E2E_WORKER } from "../constants/E2eWorker.constants";
import { createPendingDepositsPage } from "../pages/PendingDeposits.page";
import { createReservationDepositPage } from "../pages/ReservationDeposit.page";
import { createReservationDetailPage } from "../pages/ReservationDetail.page";
import { createReservationDetailDepositPage } from "../pages/ReservationDetailDeposit.page";
import { createReservationDepositFixture as seed } from "../support/createReservationDepositFixture";
import { readReservationDepositState } from "../support/readReservationDepositState";
import {
  expect,
  test,
} from "../support/reservationDepositTest";
import { switchToOperationsMode } from "../support/switchToOperationsMode";

const submitWait = { timeout: E2E_TIMEOUT_MS.POST_SUBMIT };

test.describe("Reservation deposit", () => {
  test.describe.configure({ mode: values.TEST_MODE });

  test("opens from the detail, proposes the category deposit and records an edited amount", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name
    );
    const deposit = createReservationDepositPage(page);
    const detailDeposit =
      createReservationDetailDepositPage(page);

    await createReservationDetailPage(page).goTo(
      reservation.id
    );
    await detailDeposit
      .getDepositLink(reservation.code)
      .click();
    await expect(deposit.getAmount()).toHaveValue(
      String(values.CATEGORY_DEPOSIT_USD)
    );

    await deposit.getAmount().fill(values.EDITED_AMOUNT);
    await deposit.submit();

    await expect(deposit.getStatus()).toHaveText(
      copy.SUCCESS_RECEIVED(reservation.code),
      submitWait
    );
    await expect(
      deposit.getText(
        copy.RECORDED_BY(E2E_WORKER.FULL_NAME)
      )
    ).toBeVisible();
    expect(
      await readReservationDepositState(
        activeWorker.id,
        reservation.id
      )
    ).toEqual({
      amount: values.EDITED_AMOUNT_VALUE,
      currency: CURRENCY_CODE.USD,
      declinations: 0,
      deposits: 1,
      isAuthor: true,
      status: DEPOSIT_STATUS.HELD,
    });

    await deposit.getBackLink().click();
    await expect(
      detailDeposit.getText(
        formatReservationDetailAmount(
          values.EDITED_AMOUNT_VALUE,
          CURRENCY_CODE.USD
        )
      )
    ).toBeVisible();
    await expect(
      detailDeposit.getDepositLink(reservation.code)
    ).toHaveCount(0);
  });

  test("records a deposit in colones and lists it as pending", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name
    );
    const deposit = createReservationDepositPage(page);

    await deposit.goTo(reservation.id);
    await deposit.chooseCurrency(CURRENCY_CODE.CRC);
    await expect(
      deposit.getAmount(CURRENCY_CODE.CRC)
    ).toHaveValue(String(values.CATEGORY_DEPOSIT_CRC));
    await deposit.submit();
    await expect(deposit.getStatus()).toHaveText(
      copy.SUCCESS_RECEIVED(reservation.code),
      submitWait
    );

    expect(
      await readReservationDepositState(
        activeWorker.id,
        reservation.id
      )
    ).toMatchObject({
      amount: values.CATEGORY_DEPOSIT_CRC,
      currency: CURRENCY_CODE.CRC,
      deposits: 1,
    });
    const pending = createPendingDepositsPage(page);
    await pending.goTo();
    await expect(
      pending.getRow(reservation.customerName)
    ).toBeVisible();
  });

  test("records that there was no deposit", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name
    );
    const deposit = createReservationDepositPage(page);
    const detailDeposit =
      createReservationDetailDepositPage(page);

    await deposit.goTo(reservation.id);
    await deposit.chooseDeclined();
    await expect(deposit.getAmount()).toHaveCount(0);
    await deposit.submit();
    await expect(deposit.getStatus()).toHaveText(
      copy.SUCCESS_DECLINED(reservation.code),
      submitWait
    );

    expect(
      await readReservationDepositState(
        activeWorker.id,
        reservation.id
      )
    ).toMatchObject({ declinations: 1, deposits: 0 });
    await deposit.getBackLink().click();
    await expect(
      detailDeposit.getText(detailCopy.DEPOSIT_NONE)
    ).toBeVisible();
    await expect(
      detailDeposit.getDepositLink(reservation.code)
    ).toHaveCount(0);

    await deposit.goTo(reservation.id);
    await expect(
      deposit.getText(unavailable.TITLE.already_decided)
    ).toBeVisible();
  });

  test("refuses an invalid amount and stores nothing", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name
    );
    const deposit = createReservationDepositPage(page);

    await deposit.goTo(reservation.id);
    await deposit.getAmount().fill(values.INVALID_AMOUNT);
    await deposit.submit();

    await expect(
      deposit.getText(validation.AMOUNT.format)
    ).toBeVisible();
    await expect(deposit.getStatus()).toHaveCount(0);
    expect(
      await readReservationDepositState(
        activeWorker.id,
        reservation.id
      )
    ).toMatchObject({ declinations: 0, deposits: 0 });
  });

  test("keeps Operaciones out of the deposit screen", async ({
    activeWorker,
    reservationsPage: page,
  }, testInfo) => {
    const reservation = await seed(
      activeWorker.id,
      testInfo.project.name
    );

    await switchToOperationsMode(page, activeWorker);
    await createReservationDepositPage(page).goTo(
      reservation.id
    );

    await expect(page).not.toHaveURL(
      resolveReservationDepositPath(reservation.id)
    );
    expect(
      await readReservationDepositState(
        activeWorker.id,
        reservation.id
      )
    ).toMatchObject({ declinations: 0, deposits: 0 });
  });
});
