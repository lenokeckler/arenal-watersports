import { evaluatePasswordRules } from "@/app/utils/password/evaluatePasswordRules";
import type { PasswordRecoveryResetViewModel } from "../models/PasswordRecoveryResetViewModel.interface";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import { resolvePasswordRecoveryResetErrors } from "../utils/resolvePasswordRecoveryResetErrors";
import { usePasswordRecoveryAction } from "./usePasswordRecoveryAction";
import { usePasswordRecoveryResetFocus } from "./usePasswordRecoveryResetFocus";
import { usePasswordRecoveryResetSubmitGuard } from "./usePasswordRecoveryResetSubmitGuard";
import { usePasswordRecoveryResetValues } from "./usePasswordRecoveryResetValues";

export const usePasswordRecoveryResetViewModel = (
  serverAction: PasswordRecoveryServerAction,
  initialUsername: string
): PasswordRecoveryResetViewModel => {
  const submission =
    usePasswordRecoveryAction(serverAction);
  const form = usePasswordRecoveryResetValues(
    initialUsername,
    submission.dismiss,
    submission.error
  );
  const guard = usePasswordRecoveryResetSubmitGuard(
    form.values,
    submission.dismiss,
    submission.isPending
  );
  const fieldErrors = resolvePasswordRecoveryResetErrors({
    hasSubmitted: guard.hasSubmitted,
    serverError: submission.error,
    values: form.values,
  });
  const fieldRefs = usePasswordRecoveryResetFocus(
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
    passwordRules: evaluatePasswordRules(
      form.values.newPassword
    ),
    showFailures: guard.showFailures,
    values: form.values,
  };
};
