import type { ChangeEvent } from "react";
import type { NullableRef } from "@/app/types";

export interface CategoryUnitModifyViewModel {
  canSave: boolean;
  errorMessage: NullableRef<string>;
  fuelLevel: NullableRef<number>;
  handleFuelLevelChange: (level: number) => void;
  handleImpactCountChange: (count: number) => void;
  handleSave: () => void;
  handleUsageChange: (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  impactCount: number;
  isSaving: boolean;
  usageError: NullableRef<string>;
  usageText: string;
}
