import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import { validateSignInCredentials } from "@/app/utils/sign-in/validateSignInCredentials";
import type { LoginFormSubmitHandler } from "../models/LoginFormSubmitHandler.type";
import type { LoginFormViewModel } from "../models/LoginFormViewModel.interface";
import { resolveSignInFieldErrors } from "../utils/resolveSignInFieldErrors";
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

    const validationError = submission.hasSubmitted
      ? validateSignInCredentials(form.values)
      : null;

    const handleSubmit: LoginFormSubmitHandler = (
      event
    ) => {
      event.preventDefault();
      fallback.dismiss();
      submission.submit(form.values);
    };

    const fieldErrors = resolveSignInFieldErrors(
      submission.serverError ??
        validationError ??
        fallback.error
    );

    return {
      fieldErrors,
      formAction: fallback.action,
      handlePasswordChange: form.handlePasswordChange,
      handleSubmit,
      handleUsernameChange: form.handleUsernameChange,
      isPending: submission.isPending,
      passwordError:
        fieldErrors[SIGN_IN_FIELD.PASSWORD] ?? undefined,
      usernameError:
        fieldErrors[SIGN_IN_FIELD.USERNAME] ?? undefined,
      values: form.values,
    };
  };
