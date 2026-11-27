import type { CategoryConfigureNextStepId } from "./CategoryConfigureNextStepId.type";
import type { CategoryConfigureNextStepState } from "./CategoryConfigureNextStepState.type";

export interface CategoryConfigureNextStepProps {
  id: CategoryConfigureNextStepId;
  state: CategoryConfigureNextStepState;
  title: string;
  help: string;
  action: string;
  actionLabel: string;
  optionalLabel: string;
  onAction: (stepId: CategoryConfigureNextStepId) => void;
}
