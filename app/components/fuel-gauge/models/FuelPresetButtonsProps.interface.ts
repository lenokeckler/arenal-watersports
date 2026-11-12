import type { NullableRef } from "@/app/types";

export interface FuelPresetButtonsProps {
  isDisabled?: boolean;
  level: NullableRef<number>;
  max: number;
  onSelect: (level: number) => void;
}
