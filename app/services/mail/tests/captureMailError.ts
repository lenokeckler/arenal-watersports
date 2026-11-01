import type { MailError } from "../MailError";

export const captureMailError = (
  action: () => unknown
): MailError => {
  try {
    action();
  } catch (error) {
    return error as MailError;
  }

  throw new Error("expected the action to throw");
};
