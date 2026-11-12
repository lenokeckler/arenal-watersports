import type { NullableRef } from "@/app/types";
import type { UnitReading } from "./UnitReading.interface";

export interface UnitReadingsViewProps {
  errorMessage: NullableRef<string>;
  units: UnitReading[];
}
