import { vi } from "vitest";
import type { FirstSignInChangeEvent } from "../models/FirstSignInChangeEvent.type";
import type { FirstSignInSubmitEvent } from "../models/FirstSignInSubmitEvent.type";

export const createChangeEvent = (
  name: string,
  value: string
): FirstSignInChangeEvent =>
  ({
    target: { name, value },
  }) as FirstSignInChangeEvent;

export const createSubmitEvent =
  (): FirstSignInSubmitEvent =>
    ({
      preventDefault: vi.fn(),
    }) as unknown as FirstSignInSubmitEvent;
