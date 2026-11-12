import type { Extra } from "../models/Extra.interface";
import type { ExtraCardActionsViewModel } from "../models/ExtraCardActionsViewModel.interface";
import type { ExtraCardViewModel } from "../models/ExtraCardViewModel.interface";
import { resolveExtraCardActionState } from "./resolveExtraCardActionState";
import { resolveExtraEditPath } from "./resolveExtraEditPath";

export const buildExtraCardViewModel = (
  extra: Extra,
  cardActions: ExtraCardActionsViewModel
): ExtraCardViewModel => ({
  actionState: resolveExtraCardActionState(
    extra,
    extra.id === cardActions.confirmingExtraId
  ),
  editHref: resolveExtraEditPath(extra.id),
  id: extra.id,
  isActionLoading: cardActions.pendingExtraIds.includes(
    extra.id
  ),
  name: extra.name,
  onCancelClick: cardActions.onCancelClick,
  onConfirmRemovalClick: cardActions.onConfirmRemovalClick(
    extra.id
  ),
  onReactivateClick: cardActions.onReactivateClick(
    extra.id
  ),
  onRemoveClick: cardActions.onRemoveClick(extra.id),
  status: extra.status,
});
