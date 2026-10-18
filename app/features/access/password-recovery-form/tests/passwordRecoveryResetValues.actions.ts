import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { usePasswordRecoveryResetValues } from "../hooks/usePasswordRecoveryResetValues";
import { createNamedChangeEvent } from "./createPasswordRecoveryEvents";
import type { PasswordRecoveryResetValuesResult } from "./PasswordRecoveryResetValuesResult.type";
import type { PasswordRecoveryResetValuesProps } from "./PasswordRecoveryResetValuesProps.interface";
import {
  NO_SERVER_ERROR_PROPS,
  PREFILLED_USERNAME,
  VALID_PASSWORD,
  VALID_PIN,
} from "./passwordRecoveryResetState.constants";

export const renderValues = (dismiss = vi.fn()) =>
  renderHook(
    ({ serverError }: PasswordRecoveryResetValuesProps) =>
      usePasswordRecoveryResetValues(
        PREFILLED_USERNAME,
        dismiss,
        serverError
      ),
    { initialProps: NO_SERVER_ERROR_PROPS }
  );

export const type = (
  result: PasswordRecoveryResetValuesResult,
  name: string,
  value: string
): void =>
  act(() =>
    result.current.onChange(
      createNamedChangeEvent(name, value)
    )
  );

export const fillAll = (
  result: PasswordRecoveryResetValuesResult
): void => {
  type(result, PASSWORD_RECOVERY_FIELD.PIN, VALID_PIN);
  type(
    result,
    PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
    VALID_PASSWORD
  );
  type(
    result,
    PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
    VALID_PASSWORD
  );
};
