import { evaluatePasswordRules } from "@/app/utils/password/evaluatePasswordRules";
import type { FirstSignInFormViewModel } from "../models/FirstSignInFormViewModel.interface";
import { resolveFirstSignInFormErrors } from "../utils/resolveFirstSignInFormErrors";
import { useFirstSignInAction } from "./useFirstSignInAction";
import { useFirstSignInFocus } from "./useFirstSignInFocus";
import { useFirstSignInFormValues } from "./useFirstSignInFormValues";
import { useFirstSignInSubmitGuard } from "./useFirstSignInSubmitGuard";

export const useFirstSignInFormViewModel =
  (): FirstSignInFormViewModel => {
    const submission = useFirstSignInAction();
    const form = useFirstSignInFormValues(
      submission.dismiss
    );
    const guard = useFirstSignInSubmitGuard(
      form.values,
      submission.dismiss
    );
    const fieldErrors = resolveFirstSignInFormErrors({
      hasSubmitted: guard.hasSubmitted,
      serverError: submission.error,
      values: form.values,
    });

    return {
      fieldErrors,
      fieldRefs: useFirstSignInFocus(fieldErrors, {
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
