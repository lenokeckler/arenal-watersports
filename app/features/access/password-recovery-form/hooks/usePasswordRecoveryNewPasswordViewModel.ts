import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { evaluatePasswordRules } from "@/app/utils/password/evaluatePasswordRules";
import type { PasswordRecoveryNewPasswordViewModel } from "../models/PasswordRecoveryNewPasswordViewModel.interface";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import { resolvePasswordRecoveryNewPasswordErrors } from "../utils/resolvePasswordRecoveryNewPasswordErrors";
import { usePasswordRecoveryAction } from "./usePasswordRecoveryAction";
import { usePasswordRecoveryNewPasswordFocus } from "./usePasswordRecoveryNewPasswordFocus";
import { usePasswordRecoveryNewPasswordSubmitGuard } from "./usePasswordRecoveryNewPasswordSubmitGuard";
import { usePasswordRecoveryNewPasswordValues } from "./usePasswordRecoveryNewPasswordValues";

export const usePasswordRecoveryNewPasswordViewModel = (
  serverAction: PasswordRecoveryServerAction
): PasswordRecoveryNewPasswordViewModel => {
  const submission =
    usePasswordRecoveryAction(serverAction);
  const form = usePasswordRecoveryNewPasswordValues(
    submission.dismiss
  );
  const guard = usePasswordRecoveryNewPasswordSubmitGuard(
    form.values,
    submission.dismiss,
    submission.isPending
  );
  const fieldErrors =
    resolvePasswordRecoveryNewPasswordErrors({
      hasSubmitted: guard.hasSubmitted,
      serverError: submission.error,
      values: form.values,
    });
  const fieldRefs = usePasswordRecoveryNewPasswordFocus(
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
    isResetExpired:
      submission.error?.code ===
      PASSWORD_RECOVERY_ERROR_CODE.RESET_EXPIRED,
    onChange: form.onChange,
    onSubmit: guard.onSubmit,
    passwordRules: evaluatePasswordRules(
      form.values.newPassword
    ),
    showFailures: guard.showFailures,
    values: form.values,
  };
};
