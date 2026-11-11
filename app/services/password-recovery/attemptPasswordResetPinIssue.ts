import { issuePasswordResetPin } from "./issuePasswordResetPin";
import type { IssuePasswordResetPinInput } from "./models/IssuePasswordResetPinInput.interface";
import type { PasswordResetPinIssueOutcome } from "./models/PasswordResetPinIssueOutcome.type";

export const attemptPasswordResetPinIssue = async (
  input: IssuePasswordResetPinInput
): Promise<PasswordResetPinIssueOutcome> => {
  try {
    return {
      failed: false,
      issued: await issuePasswordResetPin(input),
    };
  } catch {
    return { failed: true };
  }
};
