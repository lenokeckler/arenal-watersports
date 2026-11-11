import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { EMPTY_PASSWORD_CHANGE_INPUT } from "../constants/PasswordChangeDefaults.constants";
import { usePasswordChangeFormValues } from "../hooks/usePasswordChangeFormValues";
import { createChangeEvent } from "./createPasswordChangeEvents";
import {
  EDITED_VALUE,
  UNKNOWN_FIELD_NAME,
} from "./passwordChangeHooks.constants";

describe("usePasswordChangeFormValues", () => {
  it("starts with three empty fields", () => {
    const { result } = renderHook(() =>
      usePasswordChangeFormValues(vi.fn())
    );

    expect(result.current.values).toEqual(
      EMPTY_PASSWORD_CHANGE_INPUT
    );
  });

  it("updates only the field named by the event and reports the edit", () => {
    const onEdit = vi.fn();
    const { result } = renderHook(() =>
      usePasswordChangeFormValues(onEdit)
    );

    act(() => {
      result.current.onChange(
        createChangeEvent(
          PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
          EDITED_VALUE
        )
      );
    });

    expect(result.current.values).toEqual({
      ...EMPTY_PASSWORD_CHANGE_INPUT,
      [PASSWORD_CHANGE_FIELD.NEW_PASSWORD]: EDITED_VALUE,
    });
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it("ignores an event whose name is not a field of the form", () => {
    const onEdit = vi.fn();
    const { result } = renderHook(() =>
      usePasswordChangeFormValues(onEdit)
    );

    act(() => {
      result.current.onChange(
        createChangeEvent(UNKNOWN_FIELD_NAME, EDITED_VALUE)
      );
    });

    expect(result.current.values).toEqual(
      EMPTY_PASSWORD_CHANGE_INPUT
    );
    expect(onEdit).not.toHaveBeenCalled();
  });
});
