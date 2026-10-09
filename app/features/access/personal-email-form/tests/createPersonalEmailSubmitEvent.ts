import { vi } from "vitest";
import type { PersonalEmailSubmitEvent } from "../models/PersonalEmailSubmitEvent.type";

export const createPressedButton = (
  value: string
): HTMLButtonElement => {
  const button = document.createElement("button");
  button.value = value;
  return button;
};

export const createSubmitEvent = (
  submitter: HTMLElement | null = null
): PersonalEmailSubmitEvent =>
  ({
    nativeEvent: { submitter },
    preventDefault: vi.fn(),
  }) as unknown as PersonalEmailSubmitEvent;
