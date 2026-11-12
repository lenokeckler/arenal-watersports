import { onTestFinished } from "vitest";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryRequestFieldRefs } from "../models/PasswordRecoveryRequestFieldRefs.type";

export const attachPasswordRecoveryRequestInput = (
  fieldRefs: PasswordRecoveryRequestFieldRefs
): HTMLInputElement => {
  const input = document.createElement("input");
  document.body.append(input);
  onTestFinished(() => input.remove());
  fieldRefs[PASSWORD_RECOVERY_FIELD.USERNAME].current =
    input;
  return input;
};
