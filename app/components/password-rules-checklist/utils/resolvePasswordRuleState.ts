import {
  PASSWORD_RULE_STATE,
  type PasswordRuleState,
} from "../constants/PasswordRuleState.constants";

export const resolvePasswordRuleState = (
  isMet: boolean,
  showFailures: boolean
): PasswordRuleState => {
  if (isMet) {
    return PASSWORD_RULE_STATE.MET;
  }
  return showFailures
    ? PASSWORD_RULE_STATE.FAILED
    : PASSWORD_RULE_STATE.PENDING;
};
