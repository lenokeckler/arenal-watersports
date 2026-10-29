import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { STRING } from "@/app/constants";
import { usePasswordRecoveryRequestValues } from "../hooks/usePasswordRecoveryRequestValues";
import { createChangeEvent } from "./createPasswordRecoveryEvents";
import { RAW_USERNAME } from "./passwordRecoveryRequest.constants";

describe("usePasswordRecoveryRequestValues", () => {
  it("starts with an empty username", () => {
    const { result } = renderHook(() =>
      usePasswordRecoveryRequestValues(vi.fn())
    );

    expect(result.current.values).toEqual({
      username: STRING.Empty,
    });
  });

  it("keeps what is typed and dismisses the server error", () => {
    const dismiss = vi.fn();
    const { result } = renderHook(() =>
      usePasswordRecoveryRequestValues(dismiss)
    );

    act(() =>
      result.current.onChange(
        createChangeEvent(RAW_USERNAME)
      )
    );

    expect(result.current.values.username).toBe(
      RAW_USERNAME
    );
    expect(dismiss).toHaveBeenCalledOnce();
  });
});
