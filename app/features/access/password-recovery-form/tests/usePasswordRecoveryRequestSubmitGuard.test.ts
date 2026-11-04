import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { STRING } from "@/app/constants";
import { usePasswordRecoveryRequestSubmitGuard } from "../hooks/usePasswordRecoveryRequestSubmitGuard";
import { createSubmitEvent } from "./createPasswordRecoveryEvents";
import {
  FIRST_INVALID_SUBMIT,
  NO_INVALID_SUBMITS,
  RAW_USERNAME,
  SHORT_USERNAME,
} from "./passwordRecoveryRequest.constants";

const renderGuard = (
  username: string,
  isPending = false,
  dismiss = vi.fn()
) =>
  renderHook(() =>
    usePasswordRecoveryRequestSubmitGuard(
      { username },
      dismiss,
      isPending
    )
  );

const submit = (
  result: ReturnType<typeof renderGuard>["result"]
) => {
  const event = createSubmitEvent();
  act(() => result.current.onSubmit(event));
  return event;
};

describe("usePasswordRecoveryRequestSubmitGuard", () => {
  it("lets a valid username through", () => {
    const { result } = renderGuard(RAW_USERNAME);

    const event = submit(result);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(result.current.hasSubmitted).toBe(false);
  });

  it.each([STRING.Empty, SHORT_USERNAME])(
    "blocks the username %j, dismisses the server error and counts it",
    (username) => {
      const dismiss = vi.fn();
      const { result } = renderGuard(
        username,
        false,
        dismiss
      );

      const event = submit(result);

      expect(event.preventDefault).toHaveBeenCalledOnce();
      expect(dismiss).toHaveBeenCalledOnce();
      expect(result.current.invalidSubmitCount).toBe(
        FIRST_INVALID_SUBMIT
      );
      expect(result.current.hasSubmitted).toBe(true);
    }
  );

  it("prevents a second submit while pending without counting it", () => {
    const { result } = renderGuard(RAW_USERNAME, true);

    const event = submit(result);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(result.current.invalidSubmitCount).toBe(
      NO_INVALID_SUBMITS
    );
  });
});
