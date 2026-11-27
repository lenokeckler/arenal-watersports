import type { ChangeEvent } from "react";
import type { Database, NullableRef } from "@/app/types";

export interface CategoryUnitReceiveViewModel {
  canSave: boolean;
  canSaveLater: boolean;
  damageCause: NullableRef<
    Database["public"]["Enums"]["damage_cause"]
  >;
  handleDamageCauseChange: (value: string) => void;
  handleSaveLater: () => void;
  damageText: string;
  errorMessage: NullableRef<string>;
  fuelLevel: NullableRef<number>;
  handleDamageTextChange: (value: string) => void;
  handleFuelLevelChange: (level: number) => void;
  handleHasDamageChange: (hasDamage: boolean) => void;
  handleImpactCountChange: (count: number) => void;
  handleSave: () => void;
  handleUsageChange: (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  hasDamage: boolean;
  impactCount: number;
  isSaving: boolean;
  usageError: NullableRef<string>;
  usageText: string;
}
