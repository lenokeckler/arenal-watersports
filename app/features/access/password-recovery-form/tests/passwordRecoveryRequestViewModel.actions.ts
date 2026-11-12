import { startTransition } from "react";
import { act, renderHook } from "@testing-library/react";
import { usePasswordRecoveryRequestViewModel } from "../hooks/usePasswordRecoveryRequestViewModel";
import type { PasswordRecoveryRequestViewModel } from "../models/PasswordRecoveryRequestViewModel.interface";
import type { PasswordRecoveryServerAction } from "../models/PasswordRecoveryServerAction.type";
import {
  createChangeEvent,
  createSubmitEvent,
} from "./createPasswordRecoveryEvents";
import { createPasswordRecoveryRequestFormData } from "./createPasswordRecoveryRequestFormData";
import type { PasswordRecoveryRequestViewModelResult } from "./PasswordRecoveryRequestViewModelResult.type";

export const renderPasswordRecoveryRequestViewModel = (
  serverAction: PasswordRecoveryServerAction
) =>
  renderHook((): PasswordRecoveryRequestViewModel =>
    usePasswordRecoveryRequestViewModel(serverAction)
  );

export const typeUsername = (
  result: PasswordRecoveryRequestViewModelResult,
  value: string
): void => {
  act(() => {
    result.current.onChange(createChangeEvent(value));
  });
};

export const submitForm = (
  result: PasswordRecoveryRequestViewModelResult
) => {
  const event = createSubmitEvent();
  act(() => {
    result.current.onSubmit(event);
  });
  return event;
};

export const postForm = async (
  result: PasswordRecoveryRequestViewModelResult,
  username: string
): Promise<void> => {
  await act(() => {
    startTransition(() => {
      result.current.formAction(
        createPasswordRecoveryRequestFormData(username)
      );
    });
    return Promise.resolve();
  });
};
