import type { UnorderedListItem } from "@/app/components/list/UnorderedListProps.interface";
import PasswordRulesChecklistItem from "../PasswordRulesChecklistItem";
import type { PasswordRuleRow } from "../models/PasswordRuleRow.interface";

export const buildPasswordRuleListItems = (
  rows: PasswordRuleRow[]
): UnorderedListItem[] =>
  rows.map(({ label, rule, state }) => ({
    id: rule,
    text: (
      <PasswordRulesChecklistItem
        label={label}
        state={state}
      />
    ),
  }));
