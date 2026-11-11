import type { DispatchGroupSelection } from "./DispatchGroupSelection.interface";
import type { DispatchSheetGroup } from "./DispatchSheetGroup.interface";

export interface DispatchGroupFormProps {
  group: DispatchSheetGroup;
  isSubmitting: boolean;
  onSubmit: (selection: DispatchGroupSelection) => void;
  preselectedUnitIds?: string[];
}
