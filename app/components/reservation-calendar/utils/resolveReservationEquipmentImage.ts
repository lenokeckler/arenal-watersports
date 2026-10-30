import type { NullableRef } from "@/app/types";
import { RESERVATION_EQUIPMENT_IMAGE } from "../constants/ReservationCalendarEquipmentImage.constants";
import type { ReservationEquipmentImageOption } from "../models/ReservationEquipmentImageOption.interface";

const normalizeCategoryName = (
  categoryName: string
): string =>
  categoryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-CR");

export const resolveReservationEquipmentImage = (
  categoryName: string
): NullableRef<ReservationEquipmentImageOption> => {
  const normalizedName =
    normalizeCategoryName(categoryName);
  const matchingCategory = Object.keys(
    RESERVATION_EQUIPMENT_IMAGE
  ).find((categoryKey) =>
    normalizedName.includes(categoryKey)
  );

  return matchingCategory === undefined
    ? null
    : RESERVATION_EQUIPMENT_IMAGE[matchingCategory];
};
