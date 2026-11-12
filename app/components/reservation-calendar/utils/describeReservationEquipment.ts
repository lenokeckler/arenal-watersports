import {
  RESERVATIONS_CALENDAR_COPY as copy,
  STRING,
} from "@/app/constants";
import { RESERVATION_CALENDAR_TIME } from "../constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarEquipment } from "../models/ReservationCalendarEquipment.interface";

export const describeReservationEquipment = (
  equipment: ReservationCalendarEquipment
): string => {
  if (equipment.unitCode !== null) {
    return [
      equipment.categoryName,
      equipment.unitCode,
    ].join(STRING.SPACE);
  }
  return [
    equipment.quantity.toLocaleString(
      RESERVATION_CALENDAR_TIME.LOCALE
    ),
    equipment.categoryName,
  ].join(copy.QUANTITY_SEPARATOR);
};
