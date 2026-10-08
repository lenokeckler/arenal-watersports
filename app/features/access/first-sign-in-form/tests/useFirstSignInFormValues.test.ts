import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import { EMPTY_FIRST_PASSWORD_CHANGE_INPUT } from "../constants/FirstSignInDefaults.constants";
import { useFirstSignInFormValues } from "../hooks/useFirstSignInFormValues";
import { createChangeEvent } from "./createFirstSignInEvents";
import {
  EDITED_VALUE,
  UNKNOWN_FIELD_NAME,
} from "./firstSignInHooks.constants";

describe("useFirstSignInFormValues", () => {
  it("starts with three empty fields", () => {
    const { result } = renderHook(() =>
      useFirstSignInFormValues(vi.fn())
    );

    expect(result.current.values).toEqual(
      EMPTY_FIRST_PASSWORD_CHANGE_INPUT
    );
  });

  it("updates only the field named by the event and reports the edit", () => {
    const onEdit = vi.fn();
    const { result } = renderHook(() =>
      useFirstSignInFormValues(onEdit)
    );

    act(() => {
      result.current.onChange(
        createChangeEvent(
          FIRST_SIGN_IN_FIELD.NEW_PASSWORD,
          EDITED_VALUE
        )
      );
    });

    expect(result.current.values).toEqual({
      ...EMPTY_FIRST_PASSWORD_CHANGE_INPUT,
      [FIRST_SIGN_IN_FIELD.NEW_PASSWORD]: EDITED_VALUE,
    });
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("ignores an event whose name is not a field of the form", () => {
    const onEdit = vi.fn();
    const { result } = renderHook(() =>
      useFirstSignInFormValues(onEdit)
    );

    act(() => {
      result.current.onChange(
        createChangeEvent(UNKNOWN_FIELD_NAME, EDITED_VALUE)
      );
    });

    expect(result.current.values).toEqual(
      EMPTY_FIRST_PASSWORD_CHANGE_INPUT
    );
    expect(onEdit).not.toHaveBeenCalled();
  });
});
