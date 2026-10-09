import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import {
  AUTOCAPITALIZE,
  AUTOCOMPLETE,
  INPUT_MODE,
  INPUT_TYPES,
} from "@/app/constants";
import FormField from "../FormField";
import type { FormFieldProps } from "../models/FormFieldProps.interface";
import { createFormFieldPage } from "./FormField.page";
import {
  ERROR_MESSAGE,
  FIELD_ID,
  FIELD_LABEL,
  FIELD_NAME,
} from "./FormField.constants";
import {
  AUTOCAPITALIZE_ATTRIBUTE,
  AUTOCOMPLETE_ATTRIBUTE,
  INPUT_MODE_ATTRIBUTE,
  SPELLCHECK_ATTRIBUTE,
  SPELLCHECK_OFF,
} from "./FormField.passthrough.constants";

const renderField = (
  overrides: Partial<FormFieldProps> = {}
) => {
  render(
    <FormField
      id={FIELD_ID}
      name={FIELD_NAME}
      label={FIELD_LABEL}
      value=""
      onChange={vi.fn()}
      {...overrides}
    />
  );
  return createFormFieldPage(ERROR_MESSAGE);
};

describe("FormField input attributes", () => {
  it("forwards the email keyboard attributes to the input", () => {
    const page = renderField({
      autoCapitalize: AUTOCAPITALIZE.NONE,
      autoComplete: AUTOCOMPLETE.EMAIL,
      inputMode: INPUT_MODE.EMAIL,
      spellCheck: false,
      type: INPUT_TYPES.EMAIL,
    });

    expect(page.getInput()).toHaveAttribute(
      INPUT_MODE_ATTRIBUTE,
      INPUT_MODE.EMAIL
    );
    expect(page.getInput()).toHaveAttribute(
      AUTOCAPITALIZE_ATTRIBUTE,
      AUTOCAPITALIZE.NONE
    );
    expect(page.getInput()).toHaveAttribute(
      SPELLCHECK_ATTRIBUTE,
      SPELLCHECK_OFF
    );
    expect(page.getInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.EMAIL
    );
  });

  it("renders none of them by default", () => {
    const page = renderField();

    expect(page.getInput()).not.toHaveAttribute(
      INPUT_MODE_ATTRIBUTE
    );
    expect(page.getInput()).not.toHaveAttribute(
      AUTOCAPITALIZE_ATTRIBUTE
    );
    expect(page.getInput()).not.toHaveAttribute(
      SPELLCHECK_ATTRIBUTE
    );
  });
});
