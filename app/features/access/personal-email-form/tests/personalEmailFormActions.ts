import { startTransition } from "react";
import { act, renderHook } from "@testing-library/react";
import type { PersonalEmailChangeInput } from "@/app/utils/personal-email/models/PersonalEmailChangeInput.interface";
import { PERSONAL_EMAIL_ERROR_COPY } from "../constants/PersonalEmailErrorCopy.constants";
import { usePersonalEmailFormViewModel } from "../hooks/usePersonalEmailFormViewModel";
import type { PersonalEmailFormViewModel } from "../models/PersonalEmailFormViewModel.interface";
import type { PersonalEmailServerAction } from "../models/PersonalEmailServerAction.type";
import { createChangeEvent } from "./createPersonalEmailEvents";
import { createPersonalEmailFormData } from "./createPersonalEmailFormData";
import {
  createPressedButton,
  createSubmitEvent,
} from "./createPersonalEmailSubmitEvent";
import type { PersonalEmailViewModelResult } from "./PersonalEmailViewModelResult.type";
import { INITIAL_EMAIL } from "./personalEmailHooks.constants";

export const renderPersonalEmailViewModel = (
  action: PersonalEmailServerAction,
  initialEmail = INITIAL_EMAIL
) =>
  renderHook((): PersonalEmailFormViewModel =>
    usePersonalEmailFormViewModel({
      action,
      errorCopy: PERSONAL_EMAIL_ERROR_COPY,
      initialEmail,
    })
  );

export const typeInto = (
  result: PersonalEmailViewModelResult,
  name: string,
  value: string
): void => {
  act(() => {
    result.current.onChange(createChangeEvent(name, value));
  });
};

export const submitForm = (
  result: PersonalEmailViewModelResult,
  intent?: string
) => {
  const event = createSubmitEvent(
    intent ? createPressedButton(intent) : null
  );
  act(() => {
    result.current.onSubmit(event);
  });
  return event;
};

export const postForm = async (
  result: PersonalEmailViewModelResult,
  input: PersonalEmailChangeInput
): Promise<void> => {
  await act(() => {
    startTransition(() => {
      result.current.formAction(
        createPersonalEmailFormData(input)
      );
    });
    return Promise.resolve();
  });
};
