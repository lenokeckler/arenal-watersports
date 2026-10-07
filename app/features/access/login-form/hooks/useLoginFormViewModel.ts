import type { LoginFormSubmitHandler } from "../models/LoginFormSubmitHandler.type";
import type { LoginFormViewModel } from "../models/LoginFormViewModel.interface";
import { resolveLoginFormErrors } from "../utils/resolveLoginFormErrors";
import { useLoginFormFocus } from "./useLoginFormFocus";
import { useLoginFormValues } from "./useLoginFormValues";
import { useSignInFallback } from "./useSignInFallback";
import { useSignInSubmission } from "./useSignInSubmission";

export const useLoginFormViewModel =
  (): LoginFormViewModel => {
    const submission = useSignInSubmission();
    const fallback = useSignInFallback();
    const form = useLoginFormValues(() => {
      fallback.dismiss();
      submission.clearServerError();
    });

    const handleSubmit: LoginFormSubmitHandler = (
      event
    ) => {
      event.preventDefault();
      fallback.dismiss();
      submission.submit(form.values);
    };

    const errors = resolveLoginFormErrors({
      fallbackError: fallback.error,
      hasSubmitted: submission.hasSubmitted,
      serverError: submission.serverError,
      values: form.values,
    });

    return {
      ...errors,
      fieldRefs: useLoginFormFocus(
        errors.fieldErrors,
        submission.submitAttempt
      ),
      formAction: fallback.action,
      handlePasswordChange: form.handlePasswordChange,
      handleSubmit,
      handleUsernameChange: form.handleUsernameChange,
      isPending: submission.isPending,
      values: form.values,
    };
  };
