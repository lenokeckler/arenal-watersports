import { act } from "@testing-library/react";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import type { FirstSignInSubmitEvent } from "../models/FirstSignInSubmitEvent.type";
import {
  createChangeEvent,
  createSubmitEvent,
} from "./createFirstSignInEvents";
import type { FirstSignInViewModelResult } from "./FirstSignInViewModelResult.type";

export const typeInto = (
  result: FirstSignInViewModelResult,
  name: keyof FirstPasswordChangeInput,
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
    act(() => {
      result.current.onChange(
        createChangeEvent(name, value)
      );
    });
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

export const postForm = async (
  result: FirstSignInViewModelResult,
  formData: FormData
): Promise<void> => {
  await act(() =>
    Promise.resolve(result.current.formAction(formData))
  );
};
