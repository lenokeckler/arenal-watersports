import type { ChangeEvent } from "react";
import type { NullableRef } from "@/app/types";

export interface CategoryUnitReceiveViewModel {
  canSave: boolean;
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
