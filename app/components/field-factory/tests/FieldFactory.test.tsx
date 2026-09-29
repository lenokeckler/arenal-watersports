import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FieldFactory from "../FieldFactory";
import { INPUT_TYPES } from "@/app/constants";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  ARIA_INVALID_ATTRIBUTE,
  ARIA_INVALID_VALUE,
  BASE_CLASS_NAME,
  EXPECTED_DESCRIBEDBY,
  FIELD_ID,
  FIELD_NAME,
  FIELD_VALUE,
  TEXTBOX_ROLE,
} from "./FieldFactory.constants";

const renderField = (
  hasError: boolean,
  reference?: React.ComponentProps<
    typeof FieldFactory
  >["reference"],
  type: React.ComponentProps<
    typeof FieldFactory
  >["type"] = INPUT_TYPES.TEXT
) =>
  render(
    <FieldFactory
      id={FIELD_ID}
      name={FIELD_NAME}
      value={FIELD_VALUE}
      type={type}
      baseClassName={BASE_CLASS_NAME}
      handleChange={vi.fn()}
      hasError={hasError}
      reference={reference}
    />
  );

describe("FieldFactory aria attributes", () => {
  it("sets aria-invalid and aria-describedby when the field has an error", () => {
    renderField(true);
    const input = screen.getByRole(TEXTBOX_ROLE);

    expect(input).toHaveAttribute(
      ARIA_INVALID_ATTRIBUTE,
      ARIA_INVALID_VALUE
    );
    expect(input).toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE,
      EXPECTED_DESCRIBEDBY
    );
  });

  it("omits both attributes when the field has no error", () => {
    renderField(false);
    const input = screen.getByRole(TEXTBOX_ROLE);

    expect(input).not.toHaveAttribute(
      ARIA_INVALID_ATTRIBUTE
    );
    expect(input).not.toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE
    );
  });
});

describe("FieldFactory reference", () => {
  it("hands the text input to the reference prop", () => {
    const reference = createRef<HTMLInputElement>();
    renderField(false, reference);

    expect(reference.current).toBe(
      screen.getByRole(TEXTBOX_ROLE)
    );
  });

  it("hands the password input to the reference prop", () => {
    const reference = createRef<HTMLInputElement>();
    const { container } = renderField(
      false,
      reference,
      INPUT_TYPES.PASSWORD
    );

    expect(reference.current).toBe(
      container.querySelector("input")
    );
  });
});
