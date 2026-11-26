"use server";

import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import type { ReservationDockNoticeInput } from "../models/ReservationDockNoticeInput.interface";
import type { ReservationDockNoticeResult } from "../models/ReservationDockNoticeResult.interface";
import { setReservationDockNotice } from "../services/setReservationDockNotice";

export const submitReservationDockNotice = async (
  input: ReservationDockNoticeInput
): Promise<ReservationDockNoticeResult> => {
  await assertReservationCalendarAccess();

  try {
    await setReservationDockNotice(input);
    revalidatePath(
      PATHS.RESERVATIONS.DETAIL(input.reservationId)
    );
    revalidatePath(PATHS.OPERATIONS.PENDING_DISPATCHES);

    return { isOk: true };
  } catch {
    return { isOk: false };
  }
};
