import {
  CALENDAR_PRESENTATION,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import {
  RESERVATION_EQUIPMENT_IMAGE,
  RESERVATION_EQUIPMENT_NAME_NORMALIZATION,
} from "../constants/ReservationCalendarEquipmentImage.constants";
import type { ReservationEquipmentImageOption } from "../models/ReservationEquipmentImageOption.interface";

export const resolveReservationEquipmentImage = (
  categoryName: string
): NullableRef<ReservationEquipmentImageOption> => {
  const normalizedName = categoryName
    .normalize(
      RESERVATION_EQUIPMENT_NAME_NORMALIZATION.FORM
    )
    .replace(
      RESERVATION_EQUIPMENT_NAME_NORMALIZATION.DIACRITICS,
      STRING.Empty
    )
    .trim()
    .toLocaleLowerCase(CALENDAR_PRESENTATION.LOCALE);
  return Object.hasOwn(
    RESERVATION_EQUIPMENT_IMAGE,
    normalizedName
  )
    ? RESERVATION_EQUIPMENT_IMAGE[normalizedName]
    : null;
};
