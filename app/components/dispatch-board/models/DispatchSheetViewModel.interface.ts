import type { NullableRef } from "@/app/types";
import type { DispatchGroupSelection } from "./DispatchGroupSelection.interface";
import type { DispatchSheetGroup } from "./DispatchSheetGroup.interface";
import type { DispatchSheetPhase } from "./DispatchSheetPhase.type";

export interface DispatchSheetViewModel {
  errorMessage: NullableRef<string>;
  groups: DispatchSheetGroup[];
  handleBack: () => void;
  handleSelectGroup: (categoryId: string) => void;
  handleSubmitGroup: (
    selection: DispatchGroupSelection
  ) => Promise<void>;
  isSubmitting: boolean;
  phase: DispatchSheetPhase;
  selectedGroup: NullableRef<DispatchSheetGroup>;
}
