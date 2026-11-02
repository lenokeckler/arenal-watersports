import { vi } from "vitest";
import type { PasswordChangeFieldChangeEvent } from "../models/PasswordChangeFieldChangeEvent.type";
import type { PasswordChangeSubmitEvent } from "../models/PasswordChangeSubmitEvent.type";

export const createChangeEvent = (
  name: string,
  value: string
): PasswordChangeFieldChangeEvent =>
  ({
    target: { name, value },
  }) as PasswordChangeFieldChangeEvent;

export const createSubmitEvent =
  (): PasswordChangeSubmitEvent =>
    ({
      preventDefault: vi.fn(),
    }) as unknown as PasswordChangeSubmitEvent;
