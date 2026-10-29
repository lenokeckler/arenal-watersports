import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { INPUT_TYPES } from "@/app/constants";
import {
  ARIA_DESCRIBEDBY_ATTRIBUTE,
  ARIA_INVALID_ATTRIBUTE,
  ARIA_INVALID_VALUE,
  EXPECTED_DESCRIBEDBY,
} from "./FieldFactory.constants";
import { renderFieldFactory } from "./renderFieldFactory";

describe("FieldFactory aria attributes", () => {
  it("sets aria-invalid and aria-describedby when the field has an error", () => {
    const page = renderFieldFactory({
      hasError: true,
      hasErrorText: true,
    });

    expect(page.getTextbox()).toHaveAttribute(
      ARIA_INVALID_ATTRIBUTE,
      ARIA_INVALID_VALUE
    );
    expect(page.getTextbox()).toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE,
      EXPECTED_DESCRIBEDBY
    );
  });

  it("omits both attributes when the field has no error", () => {
    const page = renderFieldFactory();

    expect(page.getTextbox()).not.toHaveAttribute(
      ARIA_INVALID_ATTRIBUTE
    );
    expect(page.getTextbox()).not.toHaveAttribute(
      ARIA_DESCRIBEDBY_ATTRIBUTE
    );
  });
});

describe("FieldFactory reference", () => {
  it("hands the text input to the reference prop", () => {
    const reference = createRef<HTMLInputElement>();
    const page = renderFieldFactory({ reference });

    expect(reference.current).toBe(page.getTextbox());
  });

  it("hands the password input to the reference prop", () => {
    const reference = createRef<HTMLInputElement>();
    const page = renderFieldFactory({
      reference,
      type: INPUT_TYPES.PASSWORD,
    });

    expect(reference.current).toBe(page.getInput());
  });
});
