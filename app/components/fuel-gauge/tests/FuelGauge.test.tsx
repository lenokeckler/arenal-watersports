import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import FuelGauge from "../FuelGauge";
import { FUEL_GAUGE_COPY } from "../constants/FuelGaugeCopy.constants";
import { FUEL_GAUGE_FIXTURE } from "./FuelGaugeTest.constants";

describe("FuelGauge", () => {
  it("reads the level in lines over the gauge for assistive technology and never as a percentage", () => {
    render(
      <FuelGauge
        level={FUEL_GAUGE_FIXTURE.THREE_OF_FOUR}
        lowLines={FUEL_GAUGE_FIXTURE.ONE_LINE}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.IMG, {
        name: "Gasolina: 3 de 4",
      })
    ).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("writes nothing visible: the lines say the level", () => {
    render(
      <FuelGauge
        level={FUEL_GAUGE_FIXTURE.THREE_OF_FOUR}
        lowLines={FUEL_GAUGE_FIXTURE.ONE_LINE}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
      />
    );

    expect(
      screen.queryByText(/de 4/)
    ).not.toBeInTheDocument();
  });

  it("says there is no reading yet instead of showing an empty tank", () => {
    render(
      <FuelGauge
        level={null}
        lowLines={FUEL_GAUGE_FIXTURE.ONE_LINE}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
      />
    );

    expect(
      screen.getByRole(ARIA_ROLE.IMG, {
        name: `Gasolina: ${FUEL_GAUGE_COPY.NO_READING}`,
      })
    ).toBeInTheDocument();
  });

  it("is only a picture when nothing is listening", () => {
    render(
      <FuelGauge
        level={FUEL_GAUGE_FIXTURE.THREE_OF_FOUR}
        lowLines={FUEL_GAUGE_FIXTURE.ONE_LINE}
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
        lowLines={FUEL_GAUGE_FIXTURE.ONE_LINE}
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

  it("lowers the level by one when the line of the current level is tapped again", async () => {
    const onSelectLevel = vi.fn();
    render(
      <FuelGauge
        level={FUEL_GAUGE_FIXTURE.TWO_LINES}
        lowLines={FUEL_GAUGE_FIXTURE.ONE_LINE}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
        onSelectLevel={onSelectLevel}
      />
    );

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: "Raya 2 de 4",
      })
    );

    expect(onSelectLevel).toHaveBeenCalledWith(
      FUEL_GAUGE_FIXTURE.ONE_LINE
    );
  });

  it("can reach an empty tank by tapping the first line at level one", async () => {
    const onSelectLevel = vi.fn();
    render(
      <FuelGauge
        level={FUEL_GAUGE_FIXTURE.ONE_LINE}
        lowLines={FUEL_GAUGE_FIXTURE.ONE_LINE}
        max={FUEL_GAUGE_FIXTURE.FOUR_LINES}
        onSelectLevel={onSelectLevel}
      />
    );

    await userEvent.click(
      screen.getByRole(ARIA_ROLE.BUTTON, {
        name: "Raya 1 de 4",
      })
    );

    expect(onSelectLevel).toHaveBeenCalledWith(
      FUEL_GAUGE_FIXTURE.EMPTY
    );
  });

  it("marks the lines up to the level as pressed", () => {
    render(
      <FuelGauge
        level={FUEL_GAUGE_FIXTURE.TWO_LINES}
        lowLines={FUEL_GAUGE_FIXTURE.ONE_LINE}
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
