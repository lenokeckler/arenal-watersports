import type { NullableRef } from "@/app/types";
import { RESERVATION_CALENDAR_ERROR } from "../constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarEquipment } from "../models/ReservationCalendarEquipment.interface";
import type { ReservationCalendarItemSource } from "../models/ReservationCalendarItemSource.interface";

const isConcreteUnitCommitment = (
  source: ReservationCalendarItemSource
): boolean =>
  source.unit_id !== null &&
  source.category_id === null &&
  source.quantity === null &&
  source.category === null &&
  Boolean(source.unit?.code.trim()) &&
  Boolean(source.unit?.category?.id.trim()) &&
  Boolean(source.unit?.category?.name.trim());

const isCategoryCommitment = (
  source: ReservationCalendarItemSource
): boolean =>
  source.unit_id === null &&
  source.unit === null &&
  source.category_id !== null &&
  source.category?.id === source.category_id &&
  Boolean(source.category?.name.trim()) &&
  source.quantity !== null &&
  Number.isInteger(source.quantity) &&
  source.quantity > 0;

const isMonetaryExtra = (
  source: ReservationCalendarItemSource
): boolean =>
  source.unit_id === null &&
  source.unit === null &&
  source.category_id === null &&
  source.category === null &&
  source.quantity === null &&
  source.extra_id !== null;

export const mapReservationCalendarEquipment = (
  source: ReservationCalendarItemSource
): NullableRef<ReservationCalendarEquipment> => {
  if (
    isConcreteUnitCommitment(source) &&
    source.unit?.category
  ) {
    return {
      categoryId: source.unit.category.id,
      categoryName: source.unit.category.name,
      quantity: 1,
      unitCode: source.unit.code,
    };
  }
  if (
    isCategoryCommitment(source) &&
    source.category &&
    source.quantity !== null
  ) {
    return {
      categoryId: source.category.id,
      categoryName: source.category.name,
      quantity: source.quantity,
      unitCode: null,
    };
  }
  if (isMonetaryExtra(source)) {
    return null;
  }
  throw new Error(
    RESERVATION_CALENDAR_ERROR.INVALID_EQUIPMENT,
    { cause: source }
  );
};
