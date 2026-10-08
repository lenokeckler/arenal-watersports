import { act } from "@testing-library/react";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import type { FirstSignInFormAction } from "../models/FirstSignInFormAction.type";
import type { FirstSignInSubmitEvent } from "../models/FirstSignInSubmitEvent.type";
import {
  createChangeEvent,
  createSubmitEvent,
} from "./createFirstSignInEvents";
import { createFirstSignInFormData } from "./createFirstSignInFormData";
import type { FirstSignInViewModelResult } from "./FirstSignInViewModelResult.type";

export const typeInto = (
  result: FirstSignInViewModelResult,
  name: string,
  value: string
): void => {
  act(() => {
    result.current.onChange(createChangeEvent(name, value));
  });
};

export const fillForm = (
  result: FirstSignInViewModelResult,
  input: FirstPasswordChangeInput
): void => {
  Object.entries(input).forEach(([name, value]) => {
    typeInto(result, name, value);
  });
};

export const submitForm = (
  result: FirstSignInViewModelResult
): FirstSignInSubmitEvent => {
  const event = createSubmitEvent();
  act(() => {
    result.current.onSubmit(event);
  });
  return event;
};

export const postDefaultForm = async (
  action: FirstSignInFormAction
): Promise<void> => {
  await act(() =>
    Promise.resolve(
      action(
        createFirstSignInFormData(
          DEFAULT_FIRST_PASSWORD_CHANGE_INPUT
        )
      )
    )
  );
};
