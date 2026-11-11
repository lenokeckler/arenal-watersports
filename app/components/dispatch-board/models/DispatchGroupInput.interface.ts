import type { DispatchUnitReading } from "./DispatchUnitReading.interface";

export interface DispatchGroupInput {
  categoryId: string;
  departureAt: string;
  readings: DispatchUnitReading[];
  reservationId: string;
  returnsAt: string;
  unitIds: string[];
}
