import { screen, within } from "@testing-library/react";
import {
  ARIA_ROLE,
  type PasswordRule,
} from "@/app/constants";
import { PASSWORD_RULE_STATE } from "../constants/PasswordRuleState.constants";
import type { PasswordRuleState } from "../constants/PasswordRuleState.constants";
import { PASSWORD_RULE_STATE_ICON } from "../constants/PasswordRuleStateIcon.constants";
import { PASSWORD_RULES_COPY } from "../constants/PasswordRulesCopy.constants";

const PASSWORD_RULE_STATES = Object.values(
  PASSWORD_RULE_STATE
);

export const createPasswordRulesChecklistPage = () => {
  const getItems = () =>
    screen.getAllByRole(ARIA_ROLE.LISTITEM);

  const getItem = (rule: PasswordRule): HTMLElement => {
    const item = screen
      .getByText(PASSWORD_RULES_COPY.RULE[rule], {
        exact: false,
      })
      .closest("li");
    if (item === null) {
      throw new Error(`No list item for rule ${rule}`);
    }
    return item;
  };

  const getState = (
    rule: PasswordRule
  ): PasswordRuleState | null => {
    const item = within(getItem(rule));
    return (
      PASSWORD_RULE_STATES.find(
        (state) =>
          item.queryByText(
            PASSWORD_RULES_COPY.STATE[state]
          ) !== null &&
          item.queryByText(
            PASSWORD_RULE_STATE_ICON[state]
          ) !== null
      ) ?? null
    );
  };

  const getStatus = () =>
    screen.getByRole(ARIA_ROLE.STATUS);

  const observeStatus = () => {
    const observer = new MutationObserver(() => undefined);
    observer.observe(getStatus(), {
      characterData: true,
      childList: true,
      subtree: true,
    });
    return {
      disconnect: () => observer.disconnect(),
      takeChangeCount: () => observer.takeRecords().length,
    };
  };

  const getList = () => screen.getByRole(ARIA_ROLE.LIST);

  const getTitle = (id: string) =>
    document.getElementById(id);

  const getListById = (id: string) =>
    document.getElementById(id);

  return {
    getItem,
    getItems,
    getList,
    getListById,
    getState,
    getStatus,
    getTitle,
    observeStatus,
  };
};
