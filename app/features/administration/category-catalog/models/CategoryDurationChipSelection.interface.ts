import type { NullableRef } from "@/app/types";

export interface CategoryDurationChipSelection {
  selectedPresetMinutes: NullableRef<number>;
  isOtherSelected: boolean;
}
