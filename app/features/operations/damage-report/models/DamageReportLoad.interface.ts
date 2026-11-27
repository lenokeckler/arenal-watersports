import type { NullableRef } from "@/app/types";
import type { DamageReportScreen } from "./DamageReportScreen.interface";

export interface DamageReportLoad {
  errorMessage: NullableRef<string>;
  screen: NullableRef<DamageReportScreen>;
}
