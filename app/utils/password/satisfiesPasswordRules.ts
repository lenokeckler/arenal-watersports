import { evaluatePasswordRules } from "./evaluatePasswordRules";

export const satisfiesPasswordRules = (
  password: string
): boolean =>
  Object.values(evaluatePasswordRules(password)).every(
    Boolean
  );
