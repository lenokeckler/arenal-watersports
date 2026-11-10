import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationEditUnits } from "../models/ReservationEditUnits.interface";
import type { ReservationEditUnitsInput } from "../models/ReservationEditUnitsInput.interface";
import { getReservationDurationMinutes } from "./validateReservationSchedule";

const resolveKeptUnit = ({
  durationHours,
  reservation,
  values,
}: ReservationEditUnitsInput): NullableRef<ReservationCategoryUnitOption> => {
  const { equipment } = reservation;
  const isWindowUnchanged =
    values.time === reservation.time &&
    getReservationDurationMinutes(durationHours) ===
      reservation.durationMinutes;

  return equipment?.unitId &&
    equipment.unitCode &&
    values.categoryId === equipment.categoryId &&
    isWindowUnchanged
    ? { code: equipment.unitCode, id: equipment.unitId }
    : null;
};

export const resolveReservationEditUnits = (
  input: ReservationEditUnitsInput
): ReservationEditUnits => {
  const { availableUnits, isLookupSettled, values } = input;
  const keptUnit = resolveKeptUnit(input);
  const offeredUnits =
    keptUnit &&
    !availableUnits.some((unit) => unit.id === keptUnit.id)
      ? [...availableUnits, keptUnit]
      : availableUnits;
  const isSelectedUnitOffered = offeredUnits.some(
    (unit) => unit.id === values.unitId
  );

  return {
    isCurrentUnitKept: keptUnit?.id === values.unitId,
    offeredUnits,
    retainedUnitId:
      !isLookupSettled || isSelectedUnitOffered
        ? values.unitId
        : STRING.Empty,
  };
};
