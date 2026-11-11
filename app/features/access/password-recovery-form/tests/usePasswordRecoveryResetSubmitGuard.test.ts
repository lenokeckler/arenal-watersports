import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { STRING } from "@/app/constants";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import { usePasswordRecoveryResetSubmitGuard } from "../hooks/usePasswordRecoveryResetSubmitGuard";
import { createSubmitEvent } from "./createPasswordRecoveryEvents";
import {
  FIRST_INVALID_SUBMIT,
  NO_INVALID_SUBMITS,
} from "./passwordRecoveryRequest.constants";
import type { PasswordRecoveryResetGuardProps } from "./PasswordRecoveryResetGuardProps.interface";
import {
  SHORT_PIN,
  VALID_RESET_VALUES,
} from "./passwordRecoveryResetState.constants";

const renderGuard = (
  values: PasswordRecoveryPinInput,
  isPending = false,
  dismiss = vi.fn()
) =>
  renderHook(
    ({ current }: PasswordRecoveryResetGuardProps) =>
      usePasswordRecoveryResetSubmitGuard(
        current,
        dismiss,
        isPending
      ),
    { initialProps: { current: values } }
  );

const submit = (
  result: ReturnType<typeof renderGuard>["result"]
) => {
  const event = createSubmitEvent();
  act(() => result.current.onSubmit(event));
  return event;
};

describe("usePasswordRecoveryResetSubmitGuard", () => {
  it("lets a valid reset through", () => {
    const { result } = renderGuard(VALID_RESET_VALUES);

    const event = submit(result);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(result.current.hasSubmitted).toBe(false);
  });

  it.each([
    [
      "an empty PIN",
      { ...VALID_RESET_VALUES, pin: STRING.Empty },
    ],
    [
      "a short PIN",
      { ...VALID_RESET_VALUES, pin: SHORT_PIN },
    ],
  ])(
    "blocks %s, dismisses the server error and counts it",
    (_label, values) => {
      const dismiss = vi.fn();
      const { result } = renderGuard(
        values,
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
    const { result } = renderGuard(
      VALID_RESET_VALUES,
      true
    );

    const event = submit(result);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(result.current.invalidSubmitCount).toBe(
      NO_INVALID_SUBMITS
    );
  });
});
