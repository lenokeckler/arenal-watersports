import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import InlineText from "@/app/components/text/InlineText";
import { STRING } from "@/app/constants";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";
import { PASSWORD_RULE_STATE_ICON } from "./constants/PasswordRuleStateIcon.constants";
import { PASSWORD_RULES_COPY } from "./constants/PasswordRulesCopy.constants";
import type { PasswordRulesChecklistItemProps } from "./models/PasswordRulesChecklistItemProps.interface";
import {
  PASSWORD_RULES_ICON_STATE_CLASS,
  PASSWORD_RULES_ITEM_ICON_CLASS,
  PASSWORD_RULES_ITEM_STATE_CLASS,
  PASSWORD_RULES_ITEM_TEXT_CLASS,
} from "./styles/PasswordRulesChecklist.styles";

const PasswordRulesChecklistItem = ({
  label,
  state,
}: PasswordRulesChecklistItemProps): React.JSX.Element => (
  <>
    <MaterialIcon
      name={PASSWORD_RULE_STATE_ICON[state]}
      className={joinClassNames(
        PASSWORD_RULES_ITEM_ICON_CLASS,
        PASSWORD_RULES_ICON_STATE_CLASS[state]
      )}
    />
    <InlineText
      className={joinClassNames(
        PASSWORD_RULES_ITEM_TEXT_CLASS,
        PASSWORD_RULES_ITEM_STATE_CLASS[state]
      )}
    >
      <InlineText className={SCREEN_READER_ONLY_CLASS}>
        {PASSWORD_RULES_COPY.STATE[state]}
        {STRING.SPACE}
      </InlineText>
      {label}
    </InlineText>
  </>
);

export default PasswordRulesChecklistItem;
