import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import CountStepper from "../CountStepper";

const LABELS = {
  LABEL: "Golpes",
  LESS: "Quitar un golpe",
  MORE: "Agregar un golpe",
} as const;
const RANGE = { MAX: 5, MIN: 0, MIDDLE: 3 } as const;

const renderStepper = (
  value: number,
  onChange = vi.fn()
) => {
  render(
    <CountStepper
      label={LABELS.LABEL}
      lessLabel={LABELS.LESS}
      max={RANGE.MAX}
      min={RANGE.MIN}
      moreLabel={LABELS.MORE}
      onChange={onChange}
      value={value}
    />
  );

  return onChange;
};

describe("CountStepper", () => {
  it("shows the label and the value", () => {
    renderStepper(RANGE.MIDDLE);

    expect(
      screen.getByRole(ARIA_ROLE.GROUP, {
        name: LABELS.LABEL,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(String(RANGE.MIDDLE))
    ).toBeInTheDocument();
  });

  it("asks for one less or one more", async () => {
    const onChange = renderStepper(RANGE.MIDDLE);

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: LABELS.LESS,
      })
    );
    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: LABELS.MORE,
      })
    );

    expect(onChange).toHaveBeenNthCalledWith(
      1,
      RANGE.MIDDLE - 1
    );
    expect(onChange).toHaveBeenNthCalledWith(
      2,
      RANGE.MIDDLE + 1
    );
  });

  it("cannot go below the minimum", () => {
    renderStepper(RANGE.MIN);

    expect(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: LABELS.LESS,
      })
    ).toBeDisabled();
  });

  it("cannot go above the maximum", () => {
    renderStepper(RANGE.MAX);

    expect(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: LABELS.MORE,
      })
    ).toBeDisabled();
  });
});
