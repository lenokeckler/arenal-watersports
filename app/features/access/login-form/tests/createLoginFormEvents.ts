import { vi } from "vitest";
import type { LoginFormFieldChangeEvent } from "../models/LoginFormFieldChangeEvent.type";
import type { LoginFormSubmitEvent } from "../models/LoginFormSubmitEvent.type";

export const createChangeEvent = (
  value: string
): LoginFormFieldChangeEvent =>
  ({ target: { value } }) as LoginFormFieldChangeEvent;

export const createSubmitEvent = (): LoginFormSubmitEvent =>
  ({
    preventDefault: vi.fn(),
  }) as unknown as LoginFormSubmitEvent;
