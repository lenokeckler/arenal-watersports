import type { ChangeEvent } from "react";
import type { NullableRef } from "@/app/types";

export interface CategoryUnitModifyViewModel {
  canChangeMaintenance: boolean;
  canSave: boolean;
  errorMessage: NullableRef<string>;
  fuelLevel: NullableRef<number>;
  handleFuelLevelChange: (level: number) => void;
  handleImpactCountChange: (count: number) => void;
  handleMaintenanceChange: (inMaintenance: boolean) => void;
  handleSave: () => void;
  handleUsageChange: (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  impactCount: number;
  inMaintenance: boolean;
  isSaving: boolean;
  usageError: NullableRef<string>;
  usageText: string;
}
