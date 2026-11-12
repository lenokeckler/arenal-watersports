import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { createPasswordRulesChecklistPage } from "@/app/components/password-rules-checklist/tests/PasswordRulesChecklist.page";
import { FIELD_LABEL } from "./NewPasswordGroup.constants";

export const createNewPasswordGroupPage = () => {
  const checklist = createPasswordRulesChecklistPage();

  return {
    getInput: () => screen.getByLabelText(FIELD_LABEL),
    getItems: () => screen.getAllByRole(ARIA_ROLE.LISTITEM),
    getList: () => screen.getByRole(ARIA_ROLE.LIST),
    getReferencedElement: (id: string) =>
      document.getElementById(id),
    getState: checklist.getState,
  };
};
