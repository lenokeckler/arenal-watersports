import { DEPOSIT_RESOLUTION_REFUSALS } from "../constants/DepositResolutionRefusals.constants";
import type { DepositResolutionActionResult } from "../models/DepositResolutionActionResult.type";

export const mapDepositResolutionError = (
  error: unknown
): DepositResolutionActionResult => {
  if (!(error instanceof Error)) {
    throw error;
  }

  const refusal = DEPOSIT_RESOLUTION_REFUSALS.find(
    ({ message }) => error.message.includes(message)
  );

  if (!refusal) {
    throw error;
  }

  return {
    ok: false,
    errors: { ...refusal.errors },
    formError: refusal.formError,
  };
};
