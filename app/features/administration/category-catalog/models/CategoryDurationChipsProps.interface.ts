import type { NullableRef } from "@/app/types";

export interface CategoryDurationChipsProps {
  selectedPresetMinutes: NullableRef<number>;
  isOtherSelected: boolean;
  onSelectPreset: (minutes: number) => void;
  onSelectOther: () => void;
}
