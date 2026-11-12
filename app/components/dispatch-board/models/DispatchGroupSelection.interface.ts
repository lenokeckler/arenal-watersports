import type { DispatchUnitReading } from "./DispatchUnitReading.interface";

export interface DispatchGroupSelection {
  departureAt: string;
  readings: DispatchUnitReading[];
  returnsAt: string;
  unitIds: string[];
}
