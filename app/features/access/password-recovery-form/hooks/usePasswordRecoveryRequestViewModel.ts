import type { PasswordRecoveryRequestViewModel } from "../models/PasswordRecoveryRequestViewModel.interface";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import { resolvePasswordRecoveryRequestErrors } from "../utils/resolvePasswordRecoveryRequestErrors";
import { usePasswordRecoveryAction } from "./usePasswordRecoveryAction";
import { usePasswordRecoveryRequestFocus } from "./usePasswordRecoveryRequestFocus";
import { usePasswordRecoveryRequestSubmitGuard } from "./usePasswordRecoveryRequestSubmitGuard";
import { usePasswordRecoveryRequestValues } from "./usePasswordRecoveryRequestValues";

export const usePasswordRecoveryRequestViewModel = (
  serverAction: PasswordRecoveryServerAction
): PasswordRecoveryRequestViewModel => {
  const submission =
    usePasswordRecoveryAction(serverAction);
  const form = usePasswordRecoveryRequestValues(
    submission.dismiss
  );
  const guard = usePasswordRecoveryRequestSubmitGuard(
    form.values,
    submission.dismiss,
    submission.isPending
  );
  const fieldErrors = resolvePasswordRecoveryRequestErrors({
    hasSubmitted: guard.hasSubmitted,
    serverError: submission.error,
    values: form.values,
  });
  const fieldRefs = usePasswordRecoveryRequestFocus(
    fieldErrors,
    {
      invalidSubmitCount: guard.invalidSubmitCount,
      serverError: submission.error,
    }
  );

  return {
    fieldErrors,
    fieldRefs,
    formAction: submission.action,
    isPending: submission.isPending,
    onChange: form.onChange,
    onSubmit: guard.onSubmit,
    values: form.values,
  };
};
