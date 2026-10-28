import { render } from "@testing-library/react";
import PasswordRulesChecklist from "../PasswordRulesChecklist";
import type { PasswordRulesChecklistProps } from "../models/PasswordRulesChecklistProps.interface";
import { createPasswordRulesChecklistPage } from "./PasswordRulesChecklist.page";
import { DEFAULT_CHECKLIST_PROPS } from "./PasswordRulesChecklist.constants";

export const renderChecklist = (
  overrides: Partial<PasswordRulesChecklistProps> = {}
) => {
  const props = {
    ...DEFAULT_CHECKLIST_PROPS,
    ...overrides,
  };
  const view = render(
    <PasswordRulesChecklist {...props} />
  );
  const rerenderWith = (
    next: Partial<PasswordRulesChecklistProps>
  ) =>
    view.rerender(
      <PasswordRulesChecklist
        {...props}
        {...next}
      />
    );
  return {
    page: createPasswordRulesChecklistPage(),
    rerenderWith,
    unmount: view.unmount,
  };
};
