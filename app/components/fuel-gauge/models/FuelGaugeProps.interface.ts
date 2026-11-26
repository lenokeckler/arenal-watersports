import type { NullableRef } from "@/app/types";

export interface FuelGaugeProps {
  level: NullableRef<number>;
  lowLines?: number;
  max: number;
  onSelectLevel?: (level: number) => void;
}
