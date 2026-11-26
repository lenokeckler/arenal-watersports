import type { NullableRef } from "@/app/types";

export interface CategoryUnitStatusViewModel {
  errorMessage: NullableRef<string>;
  handleReturnToService: () => void;
  handleSendToMaintenance: () => void;
  isSaving: boolean;
}
