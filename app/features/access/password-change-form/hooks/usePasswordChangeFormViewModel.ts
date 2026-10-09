import { evaluatePasswordRules } from "@/app/utils/password/evaluatePasswordRules";
import type { PasswordChangeFormViewModel } from "../models/PasswordChangeFormViewModel.interface";
import { resolvePasswordChangeFormErrors } from "../utils/resolvePasswordChangeFormErrors";
import { useFirstSignInAction } from "./useFirstSignInAction";
import { usePasswordChangeFocus } from "./usePasswordChangeFocus";
import { usePasswordChangeFormValues } from "./usePasswordChangeFormValues";
import { usePasswordChangeSubmitGuard } from "./usePasswordChangeSubmitGuard";

export const usePasswordChangeFormViewModel =
  (): PasswordChangeFormViewModel => {
    const submission = useFirstSignInAction();
    const form = usePasswordChangeFormValues(
      submission.dismiss
    );
    const guard = usePasswordChangeSubmitGuard(
      form.values,
      submission.dismiss,
      submission.isPending
    );
    const fieldErrors = resolvePasswordChangeFormErrors({
      hasSubmitted: guard.hasSubmitted,
      serverError: submission.error,
      values: form.values,
    });

    return {
      fieldErrors,
      fieldRefs: usePasswordChangeFocus(fieldErrors, {
        invalidSubmitCount: guard.invalidSubmitCount,
        serverError: submission.error,
      }),
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
