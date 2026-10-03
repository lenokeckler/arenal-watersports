import { validateSignInCredentials } from "@/app/utils/sign-in/validateSignInCredentials";
import type { LoginFormSubmitHandler } from "../models/LoginFormSubmitHandler.type";
import type { LoginFormViewModel } from "../models/LoginFormViewModel.interface";
import { resolveSignInFieldErrors } from "../utils/resolveSignInFieldErrors";
import { useLoginFormValues } from "./useLoginFormValues";
import { useSignInSubmission } from "./useSignInSubmission";

export const useLoginFormViewModel =
  (): LoginFormViewModel => {
    const submission = useSignInSubmission();
    const form = useLoginFormValues(
      submission.clearServerError
    );

    const validationError = submission.hasSubmitted
      ? validateSignInCredentials(form.values)
      : null;

    const handleSubmit: LoginFormSubmitHandler = (
      event
    ) => {
      event.preventDefault();
      submission.submit(form.values);
    };

    return {
      fieldErrors: resolveSignInFieldErrors(
        submission.serverError ?? validationError
      ),
      handlePasswordChange: form.handlePasswordChange,
      handleSubmit,
      handleUsernameChange: form.handleUsernameChange,
      isPending: submission.isPending,
      values: form.values,
    };
  };
