import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FormField from "../FormField";

const FIELD_ID = "price";
const FIELD_LABEL = "Precio";
const START_ADORNMENT = "₡";
const END_ADORNMENT = "por hora";

describe("FormField adornments", () => {
  it("shows the start and end adornments beside the input, hidden from assistive technology", () => {
    render(
      <FormField
        id={FIELD_ID}
        name={FIELD_ID}
        label={FIELD_LABEL}
        onChange={vi.fn()}
        startAdornment={START_ADORNMENT}
        endAdornment={END_ADORNMENT}
      />
    );

    expect(
      screen.getByText(START_ADORNMENT)
    ).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText(END_ADORNMENT)).toHaveAttribute(
      "aria-hidden",
      "true"
    );
    expect(
      screen.getByLabelText(FIELD_LABEL, { exact: false })
    ).toBeInTheDocument();
  });

  it("renders no adornment when none is given", () => {
    render(
      <FormField
        id={FIELD_ID}
        name={FIELD_ID}
        label={FIELD_LABEL}
        onChange={vi.fn()}
      />
    );

    expect(screen.queryByText(START_ADORNMENT)).toBeNull();
    expect(screen.queryByText(END_ADORNMENT)).toBeNull();
  });
});
