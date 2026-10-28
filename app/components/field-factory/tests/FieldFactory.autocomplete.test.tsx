import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AUTOCOMPLETE, INPUT_TYPES } from "@/app/constants";
import {
  AUTOCOMPLETE_ATTRIBUTE,
  COMBOBOX_ROLE,
  TEXTBOX_ROLE,
} from "./FieldFactory.constants";
import { renderFieldFactory } from "./renderFieldFactory";

describe("FieldFactory autocomplete", () => {
  it("reaches the textarea", () => {
    renderFieldFactory({
      autoComplete: AUTOCOMPLETE.NEW_PASSWORD,
      type: INPUT_TYPES.TEXTAREA,
    });

    expect(screen.getByRole(TEXTBOX_ROLE)).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.NEW_PASSWORD
    );
  });

  it("reaches the select", () => {
    renderFieldFactory({
      autoComplete: AUTOCOMPLETE.NEW_PASSWORD,
      type: INPUT_TYPES.SELECT,
    });

    expect(screen.getByRole(COMBOBOX_ROLE)).toHaveAttribute(
      AUTOCOMPLETE_ATTRIBUTE,
      AUTOCOMPLETE.NEW_PASSWORD
    );
  });
});
