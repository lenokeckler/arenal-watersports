import type { PasswordResetPinConsumeOutcome } from "./models/PasswordResetPinConsumeOutcome.type";
import { redeemPasswordResetGrant } from "./redeemPasswordResetGrant";

export const attemptPasswordResetGrantRedeem = async (
  grant: string
): Promise<PasswordResetPinConsumeOutcome> => {
  try {
    return {
      failed: false,
      workerId: await redeemPasswordResetGrant(grant),
    };
  } catch {
    return { failed: true };
  }
};
