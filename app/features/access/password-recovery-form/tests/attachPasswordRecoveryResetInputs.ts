import { onTestFinished } from "vitest";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryResetFieldRefs } from "../models/PasswordRecoveryResetFieldRefs.type";
import type { PasswordRecoveryResetInputs } from "./PasswordRecoveryResetInputs.type";

const attachInput = (
  fieldRefs: PasswordRecoveryResetFieldRefs,
  field: keyof PasswordRecoveryResetFieldRefs
): HTMLInputElement => {
  const input = document.createElement("input");
  document.body.append(input);
  onTestFinished(() => input.remove());
  fieldRefs[field].current = input;
  return input;
};

export const attachPasswordRecoveryResetInputs = (
  fieldRefs: PasswordRecoveryResetFieldRefs
): PasswordRecoveryResetInputs => ({
  [PASSWORD_RECOVERY_FIELD.PIN]: attachInput(
    fieldRefs,
    PASSWORD_RECOVERY_FIELD.PIN
  ),
  [PASSWORD_RECOVERY_FIELD.USERNAME]: attachInput(
    fieldRefs,
    PASSWORD_RECOVERY_FIELD.USERNAME
  ),
});
