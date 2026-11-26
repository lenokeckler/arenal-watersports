import type { CurrencyCode } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { E2E_RESERVATION_CHARGE as values } from "../constants/E2eReservationCharge.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import type { createReservationChargePage } from "../pages/ReservationCharge.page";
import { expect } from "./activeWorkerTest";
import type { ReservationChargeFixture } from "./models/ReservationChargeFixture.interface";

export const recordChargeInCurrency = async (
  charge: ReturnType<typeof createReservationChargePage>,
  reservation: ReservationChargeFixture,
  currency: CurrencyCode,
  amount: string
): Promise<void> => {
  await charge.goTo(reservation.id);
  await charge.selectCurrency(currency);
  await charge.fillAmount(amount, currency);
  await charge.fillPaymentMethod(values.PAYMENT_METHOD);
  await charge.submit();

  await expect(charge.getStatus()).toHaveText(
    copy.SUCCESS(reservation.code),
    { timeout: E2E_TIMEOUT_MS.POST_SUBMIT }
  );
};
