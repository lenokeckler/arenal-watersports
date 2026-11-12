import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import FuelGauge from "../FuelGauge";
import FuelPresetButtons from "../FuelPresetButtons";
import { FUEL_GAUGE_COPY } from "../constants/FuelGaugeCopy.constants";
import { FUEL_GAUGE_FIXTURE } from "./FuelGaugeTest.constants";

describe("FuelGauge", () => {
  it("reads the level in lines over the gauge, never as a percentage", () => {
    render(
      <FuelGauge
        level={FUEL_GAUGE_FIXTURE.THREE_OF_FOUR}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
      />
    );

    expect(screen.getByText("3 de 4")).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("says there is no reading yet instead of showing an empty tank", () => {
    render(
      <FuelGauge
        level={null}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
      />
    );

    expect(
      screen.getByText(FUEL_GAUGE_COPY.NO_READING)
    ).toBeInTheDocument();
  });

  it("is only a picture when nothing is listening", () => {
    render(
      <FuelGauge
        level={FUEL_GAUGE_FIXTURE.THREE_OF_FOUR}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
      />
    );

    expect(
      screen.queryAllByRole(ARIA_ROLE.BUTTON)
    ).toHaveLength(0);
  });

  it("makes every line tappable and reports the line", async () => {
    const onSelectLevel = vi.fn();
    render(
      <FuelGauge
        level={null}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
        onSelectLevel={onSelectLevel}
      />
    );

    expect(
      screen.getAllByRole(ARIA_ROLE.BUTTON)
    ).toHaveLength(FUEL_GAUGE_FIXTURE.FOUR_LINES);

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: "Raya 3 de 4",
      })
    );

    expect(onSelectLevel).toHaveBeenCalledWith(
      FUEL_GAUGE_FIXTURE.THREE_OF_FOUR
    );
  });

  it("marks the lines up to the level as pressed", () => {
    render(
      <FuelGauge
        level={FUEL_GAUGE_FIXTURE.TWO_LINES}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
        onSelectLevel={vi.fn()}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: "Raya 2 de 4",
      })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: "Raya 3 de 4",
      })
    ).toHaveAttribute("aria-pressed", "false");
  });
});

describe("FuelPresetButtons", () => {
  it("offers a quarter, a half, three quarters and full", () => {
    render(
      <FuelPresetButtons
        level={null}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
        onSelect={vi.fn()}
      />
    );

    expect(
      screen.getAllByRole(ARIA_ROLE.BUTTON)
    ).toHaveLength(FUEL_GAUGE_FIXTURE.FOUR_LINES);
  });

  it("converts the fraction to the lines of this gauge", async () => {
    const onSelect = vi.fn();
    render(
      <FuelPresetButtons
        level={null}
        max={FUEL_GAUGE_FIXTURE.SIX_LINES}
        onSelect={onSelect}
      />
    );

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: "Medio tanque: 3 de 6",
      })
    );
    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: "Lleno: 6 de 6",
      })
    );

    expect(onSelect).toHaveBeenNthCalledWith(1, 3);
    expect(onSelect).toHaveBeenNthCalledWith(
      2,
      FUEL_GAUGE_FIXTURE.SIX_LINES
    );
  });

  it("shows which shortcut matches the current level", () => {
    render(
      <FuelPresetButtons
        level={FUEL_GAUGE_FIXTURE.TWO_LINES}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
        onSelect={vi.fn()}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: "Medio tanque: 2 de 4",
      })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("locks the shortcuts when disabled", () => {
    render(
      <FuelPresetButtons
        isDisabled
        level={null}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
        onSelect={vi.fn()}
      />
    );

    for (const button of screen.getAllByRole(
      ARIA_ROLE.BUTTON
    )) {
      expect(button).toBeDisabled();
    }
  });
});
