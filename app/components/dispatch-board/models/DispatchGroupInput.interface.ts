import type { NullableRef } from "@/app/types";
import type { DispatchUnitReading } from "./DispatchUnitReading.interface";

export interface DispatchGroupInput {
  categoryId: string;
  departureAt: string;
  radioChannel: NullableRef<number>;
  readings: DispatchUnitReading[];
  reservationId: string;
  returnsAt: string;
  unitIds: string[];
}
