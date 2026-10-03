import { act } from "@testing-library/react";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import type { LoginFormResult } from "./LoginFormResult.type";
import {
  createChangeEvent,
  createSubmitEvent,
} from "./createLoginFormEvents";

export const fillValidCredentials = (
  result: LoginFormResult
): void => {
  act(() => {
    result.current.handleUsernameChange(
      createChangeEvent(
        DEFAULT_SIGN_IN_CREDENTIALS.username
      )
    );
    result.current.handlePasswordChange(
      createChangeEvent(
        DEFAULT_SIGN_IN_CREDENTIALS.password
      )
    );
  });
};

export const submitForm = async (
  result: LoginFormResult
): Promise<void> => {
  await act(() =>
    Promise.resolve(
      result.current.handleSubmit(createSubmitEvent())
    )
  );
};
