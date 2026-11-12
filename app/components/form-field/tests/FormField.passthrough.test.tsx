import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { AUTOCOMPLETE } from "@/app/constants";
import FormField from "../FormField";
import type { FormFieldProps } from "../models/FormFieldProps.interface";
import { createFormFieldPage } from "./FormField.page";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  ERROR_MESSAGE,
  FIELD_ID,
  FIELD_LABEL,
  FIELD_NAME,
} from "./FormField.constants";
import {
  AUTOCOMPLETE_ATTRIBUTE,
  ERROR_THEN_EXTRA_DESCRIPTION,
  EXTRA_DESCRIPTION_ID,
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

describe("FormField description and autocomplete", () => {
  it("renders no description and no autocomplete attribute without the new props", () => {
    const page = renderField();

    expect(page.getInput()).not.toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE
    );
    expect(page.getInput()).not.toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE
    );
  });

  it("forwards describedBy to the input", () => {
    const page = renderField({
      describedBy: EXTRA_DESCRIPTION_ID,
    });

    expect(page.getInput()).toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE,
      EXTRA_DESCRIPTION_ID
    );
  });

  it("forwards autoComplete to the input", () => {
    const page = renderField({
      autoComplete: AUTOCOMPLETE.CURRENT_PASSWORD,
    });

    expect(page.getInput()).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.CURRENT_PASSWORD
    );
  });

  it("lists the rendered error id before describedBy", () => {
    const page = renderField({
      describedBy: EXTRA_DESCRIPTION_ID,
      error: ERROR_MESSAGE,
      showErrorText: true,
    });

    expect(page.getInput()).toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE,
      ERROR_THEN_EXTRA_DESCRIPTION
    );
  });

  it("keeps only describedBy when the error text is hidden", () => {
    const page = renderField({
      describedBy: EXTRA_DESCRIPTION_ID,
      error: ERROR_MESSAGE,
      showErrorText: false,
    });

    expect(page.getInput()).toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE,
      EXTRA_DESCRIPTION_ID
    );
  });
});
