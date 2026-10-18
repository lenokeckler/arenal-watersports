import { startTransition } from "react";
import { act, renderHook } from "@testing-library/react";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { usePasswordRecoveryResetViewModel } from "../hooks/usePasswordRecoveryResetViewModel";
import type { PasswordRecoveryResetViewModel } from "../models/PasswordRecoveryResetViewModel.interface";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import {
  createNamedChangeEvent,
  createSubmitEvent,
} from "./createPasswordRecoveryEvents";
import { createPasswordRecoveryResetFormData } from "./createPasswordRecoveryResetFormData";
import type { PasswordRecoveryResetViewModelResult } from "./PasswordRecoveryResetViewModelResult.type";

export const renderPasswordRecoveryResetViewModel = (
  serverAction: PasswordRecoveryServerAction,
  initialUsername: string
) =>
  renderHook((): PasswordRecoveryResetViewModel =>
    usePasswordRecoveryResetViewModel(
      serverAction,
      initialUsername
    )
  );

export const typeField = (
  result: PasswordRecoveryResetViewModelResult,
  name: string,
  value: string
): void => {
  act(() => {
    result.current.onChange(
      createNamedChangeEvent(name, value)
    );
  });
};

export const typeAllFields = (
  result: PasswordRecoveryResetViewModelResult,
  input: PasswordRecoveryResetInput
): void => {
  typeField(result, PASSWORD_RECOVERY_FIELD.PIN, input.pin);
  typeField(
    result,
    PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
    input.newPassword
  );
  typeField(
    result,
    PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
    input.confirmPassword
  );
};

export const submitForm = (
  result: PasswordRecoveryResetViewModelResult
) => {
  const event = createSubmitEvent();
  act(() => {
    result.current.onSubmit(event);
  });
  return event;
};

export const postForm = async (
  result: PasswordRecoveryResetViewModelResult,
  input: PasswordRecoveryResetInput
): Promise<void> => {
  await act(() => {
    startTransition(() => {
      result.current.formAction(
        createPasswordRecoveryResetFormData(input)
      );
    });
    return Promise.resolve();
  });
};
