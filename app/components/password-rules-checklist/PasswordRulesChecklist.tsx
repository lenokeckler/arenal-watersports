import Text from "@/app/components/text/Text";
import UnorderedList from "@/app/components/list/UnorderedList";
import { UNORDERED_LIST } from "@/app/components/list/UnorderedList.constants";
import { ARIA_ROLE } from "@/app/constants";
import { PASSWORD_RULES_COPY } from "./constants/PasswordRulesCopy.constants";
import { usePasswordRulesChecklistViewModel } from "./hooks/usePasswordRulesChecklistViewModel";
import type { PasswordRulesChecklistProps } from "./models/PasswordRulesChecklistProps.interface";
import {
  PASSWORD_RULES_PANEL_CLASS,
  PASSWORD_RULES_TITLE_CLASS,
} from "./styles/PasswordRulesChecklist.styles";

const PasswordRulesChecklist = ({
  id,
  results,
  showFailures,
}: PasswordRulesChecklistProps): React.JSX.Element => {
  const { items, titleId } =
    usePasswordRulesChecklistViewModel(
      id,
      results,
      showFailures
    );
  return (
    <div className={PASSWORD_RULES_PANEL_CLASS}>
      <Text
        id={titleId}
        className={PASSWORD_RULES_TITLE_CLASS}
      >
        {PASSWORD_RULES_COPY.TITLE}
      </Text>
      <UnorderedList
        id={id}
        role={ARIA_ROLE.LIST}
        aria-labelledby={titleId}
        variant={UNORDERED_LIST.VARIANTS.CHECKLIST}
        items={items}
      />
    </div>
  );
};

export default PasswordRulesChecklist;
