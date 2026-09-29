import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import FormField from "../FormField";
import { FORM_FIELD_VARIANT } from "../constants/FormFieldVariant.constants";
import type { FormFieldVariant } from "../models/FormFieldVariant.type";
import { createFormFieldPage } from "./FormField.page";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  DEFAULT_INPUT_CLASSES,
  ERROR_MESSAGE,
  EXPECTED_ERROR_ID,
  FIELD_ID,
  FIELD_LABEL,
  FIELD_NAME,
  GLASS_ERROR_TEXT_CLASS,
  GLASS_INPUT_CLASSES,
  GLASS_INPUT_ERROR_CLASS,
  GLASS_ONLY_CLASS,
} from "./FormField.constants";

const renderField = (
  variant?: FormFieldVariant,
  error?: string,
  showErrorText = true
) =>
  render(
    <FormField
      id={FIELD_ID}
      name={FIELD_NAME}
      label={FIELD_LABEL}
      value=""
      onChange={vi.fn()}
      error={error}
      showErrorText={showErrorText}
      variant={variant}
    />
  );

describe("FormField variants", () => {
  it("applies the glass classes to the input", () => {
    renderField(FORM_FIELD_VARIANT.GLASS);
    const page = createFormFieldPage(ERROR_MESSAGE);

    expect(page.getInput()).toHaveClass(
      ...GLASS_INPUT_CLASSES
    );
  });

  it("keeps the default look when no variant is given", () => {
    renderField();
    const page = createFormFieldPage(ERROR_MESSAGE);

    expect(page.getInput()).toHaveClass(
      ...DEFAULT_INPUT_CLASSES
    );
    expect(page.getInput()).not.toHaveClass(
      GLASS_ONLY_CLASS
    );
  });

  it("marks the glass input with the error border", () => {
    renderField(FORM_FIELD_VARIANT.GLASS, ERROR_MESSAGE);
    const page = createFormFieldPage(ERROR_MESSAGE);

    expect(page.getInput()).toHaveClass(
      GLASS_INPUT_ERROR_CLASS
    );
  });
});

describe("FormField error text", () => {
  it.each(Object.values(FORM_FIELD_VARIANT))(
    "renders the %s error after the input with a matching id",
    (variant) => {
      renderField(variant, ERROR_MESSAGE);
      const page = createFormFieldPage(ERROR_MESSAGE);

      expect(page.getError()).toHaveAttribute(
        "id",
        EXPECTED_ERROR_ID
      );
      expect(page.getInput()).toHaveAttribute(
        ARIA_DESCRIBEDBY_ATTRIBUTE,
        EXPECTED_ERROR_ID
      );
      expect(
        page
          .getInput()
          .compareDocumentPosition(page.getError()) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ).toBeTruthy();
    }
  );

  it("styles the glass error text in the error color", () => {
    renderField(FORM_FIELD_VARIANT.GLASS, ERROR_MESSAGE);
    const page = createFormFieldPage(ERROR_MESSAGE);

    expect(page.getError()).toHaveClass(
      GLASS_ERROR_TEXT_CLASS
    );
  });

  it("hides the text unless showErrorText is set", () => {
    renderField(
      FORM_FIELD_VARIANT.GLASS,
      ERROR_MESSAGE,
      false
    );
    const page = createFormFieldPage(ERROR_MESSAGE);

    expect(page.queryError()).toBeNull();
  });
});
