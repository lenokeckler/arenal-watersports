import {
  PASSWORD_RULE_STATE,
  type PasswordRuleState,
} from "../constants/PasswordRuleState.constants";

export const PASSWORD_RULES_PANEL_CLASS =
  "rounded-lg border border-outline-variant bg-surface-container-low/60 p-sm";

export const PASSWORD_RULES_TITLE_CLASS =
  "font-mono text-label-mono uppercase text-on-surface-variant mb-xs";

export const PASSWORD_RULES_ITEM_ICON_CLASS =
  "shrink-0 text-xl mt-px";

export const PASSWORD_RULES_ITEM_TEXT_CLASS =
  "transition-colors duration-200 motion-reduce:transition-none";

export const PASSWORD_RULES_ITEM_PENDING_CLASS =
  "text-on-surface-variant";

export const PASSWORD_RULES_ITEM_ACTIVE_CLASS =
  "text-on-surface font-medium";

export const PASSWORD_RULES_ICON_PENDING_CLASS =
  "text-outline";

export const PASSWORD_RULES_ICON_MET_CLASS = "text-primary";

export const PASSWORD_RULES_ICON_FAILED_CLASS =
  "text-error";

export const PASSWORD_RULES_ITEM_STATE_CLASS: Record<
  PasswordRuleState,
  string
> = {
  [PASSWORD_RULE_STATE.FAILED]:
    PASSWORD_RULES_ITEM_ACTIVE_CLASS,
  [PASSWORD_RULE_STATE.MET]:
    PASSWORD_RULES_ITEM_ACTIVE_CLASS,
  [PASSWORD_RULE_STATE.PENDING]:
    PASSWORD_RULES_ITEM_PENDING_CLASS,
};

export const PASSWORD_RULES_ICON_STATE_CLASS: Record<
  PasswordRuleState,
  string
> = {
  [PASSWORD_RULE_STATE.FAILED]:
    PASSWORD_RULES_ICON_FAILED_CLASS,
  [PASSWORD_RULE_STATE.MET]: PASSWORD_RULES_ICON_MET_CLASS,
  [PASSWORD_RULE_STATE.PENDING]:
    PASSWORD_RULES_ICON_PENDING_CLASS,
};
