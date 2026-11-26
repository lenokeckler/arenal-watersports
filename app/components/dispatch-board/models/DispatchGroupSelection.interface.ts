import type { NullableRef } from "@/app/types";
import type { DispatchUnitReading } from "./DispatchUnitReading.interface";

export interface DispatchGroupSelection {
  departureAt: string;
  radioChannel: NullableRef<number>;
  readings: DispatchUnitReading[];
  returnsAt: string;
  unitIds: string[];
}
