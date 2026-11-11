import type { ExtraCardActionState } from "./ExtraCardActionState.type";

export interface ExtraCardActionsProps {
  actionState: ExtraCardActionState;
  editHref: string;
  isActionLoading: boolean;
  onCancelClick: () => void;
  onConfirmRemovalClick: () => void;
  onReactivateClick: () => void;
  onRemoveClick: () => void;
}
