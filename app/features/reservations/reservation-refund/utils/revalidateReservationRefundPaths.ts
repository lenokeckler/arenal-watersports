import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { reportServerError } from "@/app/services/observability";
import { RESERVATION_REFUND_OPERATION } from "../constants/ReservationRefundOperation.constants";

export const revalidateReservationRefundPaths = (
  reservationId: string
): void => {
  try {
    revalidatePath(
      PATHS.RESERVATIONS.DETAIL(reservationId)
    );
    revalidatePath(PATHS.RESERVATIONS.INCOME);
  } catch (error) {
    reportServerError(
      RESERVATION_REFUND_OPERATION.REVALIDATE,
      error
    );
  }
};
