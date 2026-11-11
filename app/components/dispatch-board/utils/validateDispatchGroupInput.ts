import { UUID_PATTERN } from "@/app/constants";
import {
  DISPATCH_SHEET_ERROR,
  DISPATCH_SHEET_LIMITS,
} from "../constants/DispatchSheet.constants";
import type { DispatchGroupInput } from "../models/DispatchGroupInput.interface";
import type { DispatchUnitReading } from "../models/DispatchUnitReading.interface";
import { isValidFuelLevel } from "./isValidFuelLevel";
import { isValidUsageReading } from "./isValidUsageReading";

const isUuid = (value: string): boolean =>
  UUID_PATTERN.test(value);

const isValidReading = (
  reading: DispatchUnitReading,
  unitIds: string[]
): boolean =>
  unitIds.includes(reading.unitId) &&
  (reading.fuel === null ||
    isValidFuelLevel(reading.fuel)) &&
  (reading.usage === null ||
    isValidUsageReading(reading.usage));

const hasValidReadings = (
  readings: DispatchUnitReading[],
  unitIds: string[]
): boolean =>
  readings.length <= unitIds.length &&
  new Set(readings.map((reading) => reading.unitId))
    .size === readings.length &&
  readings.every((reading) =>
    isValidReading(reading, unitIds)
  );

export const validateDispatchGroupInput = ({
  categoryId,
  departureAt,
  readings,
  reservationId,
  returnsAt,
  unitIds,
}: DispatchGroupInput): void => {
  const departureMs = Date.parse(departureAt);
  const returnsMs = Date.parse(returnsAt);
  const isValid =
    isUuid(reservationId) &&
    isUuid(categoryId) &&
    unitIds.length <= DISPATCH_SHEET_LIMITS.MAX_UNITS &&
    unitIds.every(isUuid) &&
    hasValidReadings(readings, unitIds) &&
    Number.isFinite(departureMs) &&
    Number.isFinite(returnsMs) &&
    returnsMs > departureMs;

  if (!isValid) {
    throw new RangeError(
      DISPATCH_SHEET_ERROR.INVALID_INPUT
    );
  }
};
