import { vi } from "vitest";
import type { NullableRef } from "@/app/types";
import type { PersonalEmailSubmitEvent } from "../models/PersonalEmailSubmitEvent.type";

export const createPressedButton = (
  value: string
): HTMLButtonElement => {
  const button = document.createElement("button");
  button.value = value;
  return button;
};

export const createSubmitEvent = (
  submitter: NullableRef<HTMLElement> = null
): PersonalEmailSubmitEvent =>
  ({
    nativeEvent: { submitter },
    preventDefault: vi.fn(),
  }) as unknown as PersonalEmailSubmitEvent;

export const createIntentSubmitEvent = (
  intent?: string
): PersonalEmailSubmitEvent =>
  createSubmitEvent(
    intent ? createPressedButton(intent) : null
  );
