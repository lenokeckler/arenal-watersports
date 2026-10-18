import { consumePasswordResetPin } from "./consumePasswordResetPin";
import type { ConsumePasswordResetPinInput } from "./models/ConsumePasswordResetPinInput.interface";
import type { PasswordResetPinConsumeOutcome } from "./models/PasswordResetPinConsumeOutcome.type";

export const attemptPasswordResetPinConsume = async (
  input: ConsumePasswordResetPinInput
): Promise<PasswordResetPinConsumeOutcome> => {
  try {
    return {
      failed: false,
      workerId: await consumePasswordResetPin(input),
    };
  } catch {
    return { failed: true };
  }
};
