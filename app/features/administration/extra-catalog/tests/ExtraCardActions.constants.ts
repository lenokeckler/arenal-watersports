import { vi } from "vitest";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_REMOVAL_OUTCOME } from "../constants/ExtraRemovalOutcome.constants";
import type { ExtraCardActionsViewModel } from "../models/ExtraCardActionsViewModel.interface";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import type { ExtraRemovalResult } from "../models/ExtraRemovalResult.type";

export const FAKE_REMOVAL_ERROR_MESSAGE =
  "No tiene permiso para administrar los extras.";

export const DELETED_REMOVAL_RESULT: ExtraRemovalResult = {
  outcome: EXTRA_REMOVAL_OUTCOME.DELETED,
  status: EXTRA_MUTATION_STATUS.SUCCESS,
};

export const DEACTIVATED_REMOVAL_RESULT: ExtraRemovalResult =
  {
    outcome: EXTRA_REMOVAL_OUTCOME.DEACTIVATED,
    status: EXTRA_MUTATION_STATUS.SUCCESS,
  };

export const FAILED_REMOVAL_RESULT: ExtraRemovalResult = {
  message: FAKE_REMOVAL_ERROR_MESSAGE,
  status: EXTRA_MUTATION_STATUS.ERROR,
};

export const SUCCESSFUL_REACTIVATION_RESULT: ExtraMutationResult =
  { status: EXTRA_MUTATION_STATUS.SUCCESS };

export const FAILED_REACTIVATION_RESULT: ExtraMutationResult =
  {
    message: FAKE_REMOVAL_ERROR_MESSAGE,
    status: EXTRA_MUTATION_STATUS.ERROR,
  };

export const FAILED_REACTIVATION_WITHOUT_MESSAGE: ExtraMutationResult =
  { status: EXTRA_MUTATION_STATUS.ERROR };

export const buildExtraCardActionsViewModel = (
  overrides: Partial<ExtraCardActionsViewModel> = {}
): ExtraCardActionsViewModel => ({
  confirmingExtraId: null,
  onCancelClick: vi.fn(),
  onConfirmRemovalClick: () => vi.fn(),
  onReactivateClick: () => vi.fn(),
  onRemoveClick: () => vi.fn(),
  pendingExtraIds: [],
  ...overrides,
});
