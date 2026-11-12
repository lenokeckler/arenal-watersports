import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import type { MaterialIconName } from "@/app/components/icons/material-icon/models/MaterialIconName.type";
import {
  PASSWORD_RULE_STATE,
  type PasswordRuleState,
} from "./PasswordRuleState.constants";

export const PASSWORD_RULE_STATE_ICON: Record<
  PasswordRuleState,
  MaterialIconName
> = {
  [PASSWORD_RULE_STATE.FAILED]: MATERIAL_ICON_NAME.CANCEL,
  [PASSWORD_RULE_STATE.MET]:
    MATERIAL_ICON_NAME.CHECK_CIRCLE,
  [PASSWORD_RULE_STATE.PENDING]:
    MATERIAL_ICON_NAME.RADIO_BUTTON_UNCHECKED,
};
