import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { reportServerError } from "@/app/services/observability";
import { RESERVATION_DEPOSIT_OPERATION } from "../constants/ReservationDepositOperation.constants";

export const revalidateReservationDepositPaths = (
  reservationId: string
): void => {
  try {
    revalidatePath(
      PATHS.RESERVATIONS.DETAIL(reservationId)
    );
    revalidatePath(PATHS.RESERVATIONS.DEPOSITS);
  } catch (error) {
    reportServerError(
      RESERVATION_DEPOSIT_OPERATION.REVALIDATE,
      error
    );
  }
};
