import type { NullableUndefined } from "@/app/types";

export interface SelectedDayRequest {
  entryDates: string[];
  month: string;
  requested: NullableUndefined<string | string[]>;
  today: string;
}
