import { expect, type Page } from "@playwright/test";
import { RESERVATION_CANCELLATION_CAUSE_COPY as causeCopy } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationCauseCopy.constants";
import type { ReservationCancellationCause } from "@/app/features/reservations/reservation-cancellation/models/ReservationCancellationCause.type";
import { E2E_RESERVATION_CANCELLATION as cancellation } from "../constants/E2eReservationCancellation.constants";
import { E2E_TIMEOUT_MS } from "../constants/E2eRuntime.constants";
import { createReservationCancellationPage } from "../pages/ReservationCancellation.page";

export const cancelDispatchedReservation = async (
  page: Page,
  reservationId: string,
  cause: ReservationCancellationCause
): Promise<void> => {
  const form = createReservationCancellationPage(page);

  await form.goTo(reservationId);
  await form.selectCause(causeCopy[cause].label);
  await expect(
    form.getCause(causeCopy[cause].label)
  ).toBeChecked();
  await form.fillReason(cancellation.REASON);
  await form.submit();
  await expect(form.getStatus()).toBeVisible({
    timeout: E2E_TIMEOUT_MS.POST_SUBMIT,
  });
};
