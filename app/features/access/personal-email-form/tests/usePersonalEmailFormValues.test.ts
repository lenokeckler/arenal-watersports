import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { STRING } from "@/app/constants";
import { PASSWORD } from "@/app/utils/personal-email/tests/personalEmail.constants";
import type { PersonalEmailValuesProps } from "./PersonalEmailValuesProps.interface";
import { usePersonalEmailFormValues } from "../hooks/usePersonalEmailFormValues";
import { createChangeEvent } from "./createPersonalEmailEvents";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  EDITED_VALUE,
  EMAIL_FIELD_NAME,
  EMAIL_INVALID_ERROR,
  INITIAL_EMAIL,
  NO_SERVER_ERROR_PROPS,
  PASSWORD_FIELD_NAME,
  UNKNOWN_FIELD_NAME,
} from "./personalEmailHooks.constants";

const renderValues = (dismiss = vi.fn()) =>
  renderHook(
    ({ serverError }: PersonalEmailValuesProps) =>
      usePersonalEmailFormValues(
        INITIAL_EMAIL,
        serverError,
        dismiss
      ),
    { initialProps: NO_SERVER_ERROR_PROPS }
  );

describe("usePersonalEmailFormValues", () => {
  it("starts with the current address and an empty password", () => {
    const { result } = renderValues();

    expect(result.current.values).toEqual({
      currentPassword: STRING.Empty,
      email: INITIAL_EMAIL,
    });
  });

  it("updates only the named field and dismisses the server error", () => {
    const dismiss = vi.fn();
    const { result } = renderValues(dismiss);

    act(() =>
      result.current.onChange(
        createChangeEvent(EMAIL_FIELD_NAME, EDITED_VALUE)
      )
    );

    expect(result.current.values).toEqual({
      currentPassword: STRING.Empty,
      email: EDITED_VALUE,
    });
    expect(dismiss).toHaveBeenCalledOnce();
  });

  it("ignores an event whose name is not a field of the form", () => {
    const dismiss = vi.fn();
    const { result } = renderValues(dismiss);

    act(() =>
      result.current.onChange(
        createChangeEvent(UNKNOWN_FIELD_NAME, EDITED_VALUE)
      )
    );

    expect(result.current.values.email).toBe(INITIAL_EMAIL);
    expect(dismiss).not.toHaveBeenCalled();
  });

  it("clears only the password after a wrong-password response", () => {
    const { result, rerender } = renderValues();
    act(() =>
      result.current.onChange(
        createChangeEvent(PASSWORD_FIELD_NAME, PASSWORD)
      )
    );

    rerender({
      serverError: CURRENT_PASSWORD_INVALID_ERROR,
    });

    expect(result.current.values).toEqual({
      currentPassword: STRING.Empty,
      email: INITIAL_EMAIL,
    });
  });

  it("keeps the password after any other server error", () => {
    const { result, rerender } = renderValues();
    act(() =>
      result.current.onChange(
        createChangeEvent(PASSWORD_FIELD_NAME, PASSWORD)
      )
    );

    rerender({ serverError: EMAIL_INVALID_ERROR });

    expect(result.current.values.currentPassword).toBe(
      PASSWORD
    );
  });
});
