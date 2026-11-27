import type { NullableRef } from "@/app/types";
import type { UnitHistoryData } from "./UnitHistoryData.interface";

export interface UnitHistoryViewProps {
  page: number;
  data: NullableRef<UnitHistoryData>;
  errorMessage: NullableRef<string>;
}
