import { vi } from "vitest";
import type { PasswordRecoveryFieldChangeEvent } from "../models/PasswordRecoveryFieldChangeEvent.type";
import type { PasswordRecoverySubmitEvent } from "../models/PasswordRecoverySubmitEvent.type";

export const createChangeEvent = (
  value: string
): PasswordRecoveryFieldChangeEvent =>
  ({
    target: { value },
  }) as PasswordRecoveryFieldChangeEvent;

export const createNamedChangeEvent = (
  name: string,
  value: string
): PasswordRecoveryFieldChangeEvent =>
  ({
    target: { name, value },
  }) as PasswordRecoveryFieldChangeEvent;

export const createSubmitEvent =
  (): PasswordRecoverySubmitEvent =>
    ({
      preventDefault: vi.fn(),
    }) as unknown as PasswordRecoverySubmitEvent;
