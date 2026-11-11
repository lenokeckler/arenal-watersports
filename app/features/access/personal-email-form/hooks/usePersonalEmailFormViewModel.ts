import type { PersonalEmailFormViewModel } from "../models/PersonalEmailFormViewModel.interface";
import type { PersonalEmailFormViewModelOptions } from "../models/PersonalEmailFormViewModelOptions.interface";
import { resolvePersonalEmailFormErrors } from "../utils/resolvePersonalEmailFormErrors";
import { usePersonalEmailAction } from "./usePersonalEmailAction";
import { usePersonalEmailFocus } from "./usePersonalEmailFocus";
import { usePersonalEmailFormValues } from "./usePersonalEmailFormValues";
import { usePersonalEmailSubmitGuard } from "./usePersonalEmailSubmitGuard";

export const usePersonalEmailFormViewModel = ({
  action,
  errorCopy,
  initialEmail,
}: PersonalEmailFormViewModelOptions): PersonalEmailFormViewModel => {
  const submission = usePersonalEmailAction(action);
  const form = usePersonalEmailFormValues(
    initialEmail,
    submission.error,
    submission.dismiss
  );
  const guard = usePersonalEmailSubmitGuard(
    form.values,
    submission.dismiss,
    submission.isPending
  );
  const fieldErrors = resolvePersonalEmailFormErrors({
    errorCopy,
    hasSubmitted: guard.hasSubmitted,
    serverError: submission.error,
    values: { ...form.values, intent: guard.intent },
  });
  const fieldRefs = usePersonalEmailFocus(fieldErrors, {
    invalidSubmitCount: guard.invalidSubmitCount,
    serverError: submission.error,
  });

  return {
    fieldErrors,
    fieldRefs,
    formAction: submission.action,
    isPending: submission.isPending,
    onChange: form.onChange,
    onSubmit: guard.onSubmit,
    pendingIntent: guard.pendingIntent,
    values: form.values,
  };
};
