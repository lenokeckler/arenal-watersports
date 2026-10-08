import {
  PASSWORD_LENGTH,
  PASSWORD_RULE,
  type PasswordRule,
} from "@/app/constants";
import {
  PASSWORD_RULE_STATE,
  type PasswordRuleState,
} from "./PasswordRuleState.constants";

export const PASSWORD_RULES_COPY = {
  RULE: {
    [PASSWORD_RULE.LENGTH]: `Entre ${PASSWORD_LENGTH.MIN} y ${PASSWORD_LENGTH.MAX} caracteres`,
    [PASSWORD_RULE.UPPERCASE]:
      "Al menos una letra mayúscula",
    [PASSWORD_RULE.LOWERCASE]:
      "Al menos una letra minúscula",
    [PASSWORD_RULE.DIGIT]: "Al menos un número",
    [PASSWORD_RULE.SYMBOL]:
      "Al menos un símbolo, por ejemplo ! @ # $ %",
  } satisfies Record<PasswordRule, string>,
  STATE: {
    [PASSWORD_RULE_STATE.FAILED]: "No cumple:",
    [PASSWORD_RULE_STATE.MET]: "Cumplido:",
    [PASSWORD_RULE_STATE.PENDING]: "Falta:",
  } satisfies Record<PasswordRuleState, string>,
  SUMMARY_ALL: (total: number): string =>
    `Cumple los ${total} requisitos`,
  SUMMARY_PARTIAL: (met: number, total: number): string =>
    `Cumple ${met} de ${total} requisitos`,
  TITLE: "La contraseña debe tener:",
} as const;
