import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PERSONAL_EMAIL_INTENT } from "@/app/constants";
import type { PersonalEmailGuardProps } from "./PersonalEmailGuardProps.interface";
import { usePersonalEmailSubmitGuard } from "../hooks/usePersonalEmailSubmitGuard";
import type { PersonalEmailFieldValues } from "../models/PersonalEmailFieldValues.type";
import {
  createPressedButton,
  createSubmitEvent,
} from "./createPersonalEmailSubmitEvent";
import {
  EMPTY_VALUES,
  FILLED_VALUES,
  REMOVE_VALUES,
  IDLE_PROPS,
} from "./personalEmailHooks.constants";

const renderGuard = (
  values: PersonalEmailFieldValues,
  dismiss = vi.fn()
) =>
  renderHook(
    ({ isPending }: PersonalEmailGuardProps) =>
      usePersonalEmailSubmitGuard(
        values,
        dismiss,
        isPending
      ),
    { initialProps: IDLE_PROPS }
  );

const submit = (
  result: ReturnType<typeof renderGuard>["result"],
  intent?: string
) => {
  const event = createSubmitEvent(
    intent ? createPressedButton(intent) : null
  );
  act(() => result.current.onSubmit(event));
  return event;
};

describe("usePersonalEmailSubmitGuard", () => {
  it("lets a valid save through and records the intent", () => {
    const { result } = renderGuard(FILLED_VALUES);

    const event = submit(
      result,
      PERSONAL_EMAIL_INTENT.SAVE
    );

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(result.current.intent).toBe(
      PERSONAL_EMAIL_INTENT.SAVE
    );
    expect(result.current.hasSubmitted).toBe(false);
  });

  it("does not block a remove with an empty address", () => {
    const { result } = renderGuard(REMOVE_VALUES);

    const event = submit(
      result,
      PERSONAL_EMAIL_INTENT.REMOVE
    );

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(result.current.intent).toBe(
      PERSONAL_EMAIL_INTENT.REMOVE
    );
  });

  it("blocks an invalid save, dismisses the server error and counts it", () => {
    const dismiss = vi.fn();
    const { result } = renderGuard(EMPTY_VALUES, dismiss);

    const event = submit(
      result,
      PERSONAL_EMAIL_INTENT.SAVE
    );

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(dismiss).toHaveBeenCalledOnce();
    expect(result.current.invalidSubmitCount).toBe(1);
    expect(result.current.hasSubmitted).toBe(true);
  });

  it("treats an implicit submission as save", () => {
    const { result } = renderGuard(EMPTY_VALUES);

    const event = submit(result);

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(result.current.intent).toBe(
      PERSONAL_EMAIL_INTENT.SAVE
    );
  });

  it("prevents a second submit while pending without counting it", () => {
    const { result, rerender } = renderGuard(FILLED_VALUES);
    rerender({ isPending: true });

    const event = submit(
      result,
      PERSONAL_EMAIL_INTENT.SAVE
    );

    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(result.current.invalidSubmitCount).toBe(0);
  });

  it("exposes the pressed intent as pending only while pending", () => {
    const { result, rerender } = renderGuard(FILLED_VALUES);
    submit(result, PERSONAL_EMAIL_INTENT.REMOVE);
    expect(result.current.pendingIntent).toBeNull();

    rerender({ isPending: true });

    expect(result.current.pendingIntent).toBe(
      PERSONAL_EMAIL_INTENT.REMOVE
    );
  });
});
