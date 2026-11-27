import type { NullableRef } from "@/app/types";
import type { DispatchRadioChannelViewModel } from "@/app/components/dispatch-board/models/DispatchRadioChannelViewModel.interface";
import type { DispatchTimesViewModel } from "@/app/components/dispatch-board/models/DispatchTimesViewModel.interface";

export interface CategoryUnitInfoViewModel {
  canSave: boolean;
  errorMessage: NullableRef<string>;
  handleSave: () => void;
  handleToggleEditing: () => void;
  isEditing: boolean;
  isSaving: boolean;
  radio: DispatchRadioChannelViewModel;
  timeState: DispatchTimesViewModel;
}
