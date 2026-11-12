import type { DispatchUnitReading } from "./DispatchUnitReading.interface";
import type { DispatchUnitReadingRow } from "./DispatchUnitReadingRow.interface";

export interface DispatchUnitReadingsViewModel {
  areReadingsComplete: boolean;
  buildReadings: () => DispatchUnitReading[];
  handleFuelChange: (unitId: string, text: string) => void;
  handleUsageChange: (unitId: string, text: string) => void;
  rows: DispatchUnitReadingRow[];
}
