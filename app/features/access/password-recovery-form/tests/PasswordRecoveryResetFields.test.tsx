import { describe, expect, it } from "vitest";
import {
  AUTOCOMPLETE,
  PASSWORD_RECOVERY_FIELD,
  PASSWORD_RULE,
} from "@/app/constants";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { PASSWORD_RULE_STATE } from "@/app/components/password-rules-checklist/constants/PasswordRuleState.constants";
import { createPasswordRulesChecklistPage } from "@/app/components/password-rules-checklist/tests/PasswordRulesChecklist.page";
import {
  AUTOCOMPLETE_ATTRIBUTE,
  DESCRIBED_BY_ATTRIBUTE,
  READONLY_PROPERTY,
} from "./passwordRecoveryScreen.constants";
import {
  FIELD_ERRORS,
  PASSWORD_FIELDS,
  RESET_FIELD_ORDER,
  RULE_COUNT,
  createResetFieldsProps,
} from "./passwordRecoveryResetSections.constants";
import { renderResetFields } from "./PasswordRecoveryResetSections.page";

const getLengthState = () =>
  createPasswordRulesChecklistPage().getState(
    PASSWORD_RULE.LENGTH
  );

describe("PasswordRecoveryResetFields", () => {
  it("renders username, pin, new password and confirmation in that order", () => {
    const page = renderResetFields();

    expect(page.getFieldNames()).toEqual(RESET_FIELD_ORDER);
  });

  it("lists every password rule as pending before anything is typed", () => {
    const page = renderResetFields();

    expect(page.getItems()).toHaveLength(RULE_COUNT);
    expect(getLengthState()).toBe(
      PASSWORD_RULE_STATE.PENDING
    );
  });

  it("marks unmet rules as failed when failures are shown", () => {
    renderResetFields({ showFailures: true });

    expect(getLengthState()).toBe(
      PASSWORD_RULE_STATE.FAILED
    );
  });

  it.each(PASSWORD_FIELDS)(
    "asks for a new password in the %s field",
    (name) => {
      const page = renderResetFields();

      expect(page.getInput(name)).toHaveAttribute(
        AUTOCOMPLETE_ATTRIBUTE,
        AUTOCOMPLETE.NEW_PASSWORD
      );
    }
  );

  it.each(RESET_FIELD_ORDER)(
    "links the %s error to its field",
    (name) => {
      const props = createResetFieldsProps();
      const page = renderResetFields({
        fieldErrors: {
          ...props.fieldErrors,
          [name]: FIELD_ERRORS[name],
        },
      });

      expect(page.getInput(name)).toHaveAttribute(
        DESCRIBED_BY_ATTRIBUTE,
        expect.stringContaining(
          `${name}${FIELD_ERROR_ID_SUFFIX}`
        )
      );
    }
  );

  it.each(RESET_FIELD_ORDER)(
    "locks the %s field while pending",
    (name) => {
      const page = renderResetFields({ isPending: true });

      expect(page.getInput(name)).toHaveProperty(
        READONLY_PROPERTY,
        true
      );
    }
  );

  it("keeps the fields editable while idle", () => {
    const page = renderResetFields();

    expect(
      page.getInput(PASSWORD_RECOVERY_FIELD.PIN)
    ).toHaveProperty(READONLY_PROPERTY, false);
  });
});
