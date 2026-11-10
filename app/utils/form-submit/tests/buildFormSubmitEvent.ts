import { vi } from "vitest";
import type { FormSubmitEvent } from "../models/FormSubmitEvent.type";

export const buildFormSubmitEvent = (
  preventDefault: () => void = vi.fn()
): FormSubmitEvent =>
  ({ preventDefault }) as FormSubmitEvent;
