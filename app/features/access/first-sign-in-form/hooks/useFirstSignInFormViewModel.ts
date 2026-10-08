import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { validateFirstPasswordChange } from "@/app/utils/first-sign-in/validateFirstPasswordChange";
import { evaluatePasswordRules } from "@/app/utils/password/evaluatePasswordRules";
import type { FirstSignInFormViewModel } from "../models/FirstSignInFormViewModel.interface";
import type { FirstSignInSubmitHandler } from "../models/FirstSignInSubmitHandler.type";
import { resolveFirstSignInFormErrors } from "../utils/resolveFirstSignInFormErrors";
import { useFirstSignInAction } from "./useFirstSignInAction";
import { useFirstSignInFocus } from "./useFirstSignInFocus";
import { useFirstSignInFormValues } from "./useFirstSignInFormValues";

const nextCount = (count: number): number => count + 1;

export const useFirstSignInFormViewModel =
  (): FirstSignInFormViewModel => {
    const submission = useFirstSignInAction();
    const form = useFirstSignInFormValues(
      submission.dismiss
    );
    const [invalidSubmitCount, setInvalidSubmitCount] =
      useState(0);
    const [failedNewPassword, setFailedNewPassword] =
      useState<NullableRef<string>>(null);

    const onSubmit: FirstSignInSubmitHandler = (event) => {
      if (
        validateFirstPasswordChange(form.values) === null
      ) {
        return;
      }
      event.preventDefault();
      submission.dismiss();
      setInvalidSubmitCount(nextCount);
      setFailedNewPassword(form.values.newPassword);
    };

    const fieldErrors = resolveFirstSignInFormErrors({
      hasSubmitted: invalidSubmitCount > 0,
      serverError: submission.error,
      values: form.values,
    });

    return {
      fieldErrors,
      fieldRefs: useFirstSignInFocus(fieldErrors, {
        invalidSubmitCount,
        serverError: submission.error,
      }),
      formAction: submission.action,
      isPending: submission.isPending,
      onChange: form.onChange,
      onSubmit,
      passwordRules: evaluatePasswordRules(
        form.values.newPassword
      ),
      showFailures:
        failedNewPassword === form.values.newPassword,
      values: form.values,
    };
  };
