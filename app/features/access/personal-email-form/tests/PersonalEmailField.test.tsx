import { FIELD_ERROR_ID_SUFFIX } from "@/app/components/field-factory/constants/FieldFactory.constants";
import { describe, expect, it } from "vitest";
import { PERSONAL_EMAIL_HINT_ID } from "../constants/PersonalEmailFieldIds.constants";
import { PERSONAL_EMAIL_FORM_COPY } from "../constants/PersonalEmailFormCopy.constants";
import {
  AUTOCAPITALIZE_ATTRIBUTE,
  AUTOCOMPLETE_ATTRIBUTE,
  DESCRIBED_BY_ATTRIBUTE,
  FIELD_ERROR_MESSAGE,
  ID_ATTRIBUTE,
  INPUT_MODE_ATTRIBUTE,
  READONLY_PROPERTY,
  REGISTERED_ADDRESS,
  SPELLCHECK_ATTRIBUTE,
  TYPE_ATTRIBUTE,
  FALSE_VALUE,
} from "./personalEmailScreen.constants";
import { renderPersonalEmailField } from "./renderPersonalEmailField";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
  PERSONAL_EMAIL_FIELD,
} from "@/app/constants";

describe("PersonalEmailField", () => {
  it("asks the phone for an email keyboard without capitals or correction", () => {
    const input = renderPersonalEmailField().getInput();

    expect(input).toHaveAttribute(
      TYPE_ATTRIBUTE,
      INPUT_TYPES.EMAIL
    );
    expect(input).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.EMAIL
    );
    expect(input).toHaveAttribute(
      INPUT_MODE_ATTRIBUTE,
      INPUT_MODE.EMAIL
    );
    expect(input).toHaveAttribute(
      AUTOCAPITALIZE_ATTRIBUTE,
      AUTOCAPITALIZE.NONE
    );
    expect(input).toHaveAttribute(
      SPELLCHECK_ATTRIBUTE,
      FALSE_VALUE
    );
  });

  it("shows the current value", () => {
    expect(
      renderPersonalEmailField().getInput()
    ).toHaveValue(REGISTERED_ADDRESS);
  });

  it("describes the input with the transparency hint", () => {
    const page = renderPersonalEmailField();

    expect(page.getHint()).toHaveAttribute(
      ID_ATTRIBUTE,
      PERSONAL_EMAIL_HINT_ID
    );
    expect(page.getInput()).toHaveAttribute(
      DESCRIBED_BY_ATTRIBUTE,
      PERSONAL_EMAIL_HINT_ID
    );
  });

  it("lists the error before the hint when the field is invalid", () => {
    const input = renderPersonalEmailField({
      error: FIELD_ERROR_MESSAGE,
    }).getInput();

    expect(input).toHaveAttribute(
      DESCRIBED_BY_ATTRIBUTE,
      `${PERSONAL_EMAIL_FIELD.EMAIL}${FIELD_ERROR_ID_SUFFIX} ${PERSONAL_EMAIL_HINT_ID}`
    );
  });

  it("keeps the placeholder from the copy", () => {
    expect(
      renderPersonalEmailField().getInput()
    ).toHaveProperty(
      "placeholder",
      PERSONAL_EMAIL_FORM_COPY.EMAIL_PLACEHOLDER
    );
  });

  it("is editable while idle", () => {
    expect(
      renderPersonalEmailField().getInput()
    ).toHaveProperty(READONLY_PROPERTY, false);
  });

  it("locks the input while pending", () => {
    expect(
      renderPersonalEmailField({
        isPending: true,
      }).getInput()
    ).toHaveProperty(READONLY_PROPERTY, true);
  });
});
