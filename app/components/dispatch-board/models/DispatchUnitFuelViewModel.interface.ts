import type { DispatchUnitFuelRow } from "./DispatchUnitFuelRow.interface";
import type { DispatchUnitReading } from "./DispatchUnitReading.interface";

export interface DispatchUnitFuelViewModel {
  areLevelsReady: boolean;
  buildReadings: () => DispatchUnitReading[];
  handleLevelChange: (
    unitId: string,
    level: number
  ) => void;
  rows: DispatchUnitFuelRow[];
}
