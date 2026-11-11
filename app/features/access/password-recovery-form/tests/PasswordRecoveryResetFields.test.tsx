import { describe, expect, it } from "vitest";
import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import {
  DESCRIBED_BY_ATTRIBUTE,
  READONLY_PROPERTY,
} from "./passwordRecoveryScreen.constants";
import {
  FIELD_ERRORS,
  RESET_FIELD_ORDER,
  createResetFieldsProps,
} from "./passwordRecoveryResetSections.constants";
import { renderResetFields } from "./PasswordRecoveryResetSections.page";

describe("PasswordRecoveryResetFields", () => {
  it("renders username and pin in that order", () => {
    const page = renderResetFields();

    expect(page.getFieldNames()).toEqual(RESET_FIELD_ORDER);
  });

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
