import { RESERVATION_CALENDAR_GUIDE_TYPE } from "@/app/constants";
import { RESERVATION_CALENDAR_ERROR } from "@/app/components/reservation-calendar/constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarGuide } from "@/app/components/reservation-calendar/models/ReservationCalendarGuide.type";
import type { ReservationCalendarGuideAssignmentSource } from "../models/ReservationCalendarGuideAssignmentSource.interface";

export const mapReservationCalendarGuide = (
  source: ReservationCalendarGuideAssignmentSource
): ReservationCalendarGuide => {
  const worker = source.workers;
  if (worker === null) {
    return {
      id: source.worker_id,
      type: RESERVATION_CALENDAR_GUIDE_TYPE.UNAVAILABLE,
    };
  }
  if (!worker.full_name.trim()) {
    throw new Error(
      RESERVATION_CALENDAR_ERROR.INVALID_GUIDE,
      { cause: source.worker_id }
    );
  }
  return {
    fullName: worker.full_name,
    id: source.worker_id,
    type: worker.is_external_guide
      ? RESERVATION_CALENDAR_GUIDE_TYPE.EXTERNAL
      : RESERVATION_CALENDAR_GUIDE_TYPE.INTERNAL,
  };
};
