import type { NullableRef } from "@/app/types";

export interface CategoryUnitReceiveOrderProps {
  damageCause: NullableRef<string>;
  onDamageCauseChange: (value: string) => void;
  damageText: string;
  hasDamage: boolean;
  onDamageTextChange: (value: string) => void;
  onHasDamageChange: (hasDamage: boolean) => void;
}
