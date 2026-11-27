import { LENGTH } from "@/app/constants";
import type { Extra } from "../models/Extra.interface";
import type { ExtraCardActionsViewModel } from "../models/ExtraCardActionsViewModel.interface";
import type { ExtraCardViewModel } from "../models/ExtraCardViewModel.interface";
import { buildExtraCompatibilityLabel } from "./buildExtraCompatibilityLabel";
import { buildExtraOccupancyLabel } from "./buildExtraOccupancyLabel";
import { buildExtraPriceLabels } from "./buildExtraPriceLabels";
import { resolveExtraCardActionState } from "./resolveExtraCardActionState";
import { resolveExtraCompatibilityPath } from "./resolveExtraCompatibilityPath";
import { resolveExtraEditPath } from "./resolveExtraEditPath";

export const buildExtraCardViewModel = (
  extra: Extra,
  cardActions: ExtraCardActionsViewModel
): ExtraCardViewModel => ({
  actionState: resolveExtraCardActionState(
    extra,
    extra.id === cardActions.confirmingExtraId
  ),
  compatibilityHref: resolveExtraCompatibilityPath(
    extra.id
  ),
  compatibilityLabel: buildExtraCompatibilityLabel(
    extra.compatibleUnitCount
  ),
  editHref: resolveExtraEditPath(extra.id),
  hasCompatibility: extra.compatibleUnitCount > LENGTH.ZERO,
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
  occupancyLabel: buildExtraOccupancyLabel(extra),
  prices: buildExtraPriceLabels(extra),
  status: extra.status,
});
