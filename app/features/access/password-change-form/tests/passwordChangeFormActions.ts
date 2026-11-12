import { act } from "@testing-library/react";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import type { PasswordChangeFormAction } from "../models/PasswordChangeFormAction.type";
import type { PasswordChangeSubmitEvent } from "../models/PasswordChangeSubmitEvent.type";
import {
  createChangeEvent,
  createSubmitEvent,
} from "./createPasswordChangeEvents";
import { createPasswordChangeFormData } from "./createPasswordChangeFormData";
import type { PasswordChangeViewModelResult } from "./PasswordChangeViewModelResult.type";

export const typeInto = (
  result: PasswordChangeViewModelResult,
  name: string,
  value: string
): void => {
  act(() => {
    result.current.onChange(createChangeEvent(name, value));
  });
};

export const fillForm = (
  result: PasswordChangeViewModelResult,
  input: PasswordChangeInput
): void => {
  Object.entries(input).forEach(([name, value]) => {
    typeInto(result, name, value);
  });
};

export const submitForm = (
  result: PasswordChangeViewModelResult
): PasswordChangeSubmitEvent => {
  const event = createSubmitEvent();
  act(() => {
    result.current.onSubmit(event);
  });
  return event;
};

export const postDefaultForm = async (
  action: PasswordChangeFormAction
): Promise<void> => {
  await act(() =>
    Promise.resolve(
      action(
        createPasswordChangeFormData(
          DEFAULT_PASSWORD_CHANGE_INPUT
        )
      )
    )
  );
};
