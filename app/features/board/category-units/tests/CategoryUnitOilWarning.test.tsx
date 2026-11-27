import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import CategoryUnitRow from "../components/CategoryUnitRow";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import { buildUnitReadings } from "../utils/buildUnitReadings";
import { MOTOR_BOARD_UNIT_ROW } from "./CategoryUnitRows.constants";
import { MOTOR_READINGS } from "./CategoryUnitsBoard.constants";
import { DEFAULT_CATEGORY_UNIT } from "./CategoryUnits.constants";

const renderUnit = (oilRemaining: number | null) => {
  const unit: CategoryUnit = {
    ...DEFAULT_CATEGORY_UNIT,
    readings: { ...MOTOR_READINGS, oilRemaining },
    status: INVENTORY_UNIT_STATUS.AVAILABLE,
  };

  render(
    <CategoryUnitRow
      image={null}
      unit={unit}
    />
  );
};

describe("oil warning on the unit card", () => {
  it("shows how much is left, with an accessible name, when the change is near", () => {
    renderUnit(8);

    const warning = screen.getByLabelText(
      "Necesita cambio de aceite"
    );

    expect(warning).toHaveTextContent("8 h");
    expect(warning).not.toHaveClass("font-bold");
    expect(warning.querySelector("svg")).toHaveClass(
      "text-[#ffb000]"
    );
  });

  it("shows the hours past in red with a minus sign", () => {
    renderUnit(-2.5);

    const warning = screen.getByLabelText(
      "Necesita cambio de aceite"
    );

    expect(warning).toHaveTextContent("−2,5 h");
    expect(warning.querySelector("svg")).toHaveClass(
      "text-[#ff1744]"
    );
  });

  it("shows nothing when the oil change is not near", () => {
    renderUnit(null);

    expect(
      screen.queryByLabelText("Necesita cambio de aceite")
    ).not.toBeInTheDocument();
  });

  it("keeps the remaining distance only when the database raises the warning", () => {
    expect(
      buildUnitReadings({
        ...MOTOR_BOARD_UNIT_ROW,
        oil_remaining: 30,
        oil_warning: true,
      })?.oilRemaining
    ).toBe(30);
    expect(
      buildUnitReadings({
        ...MOTOR_BOARD_UNIT_ROW,
        oil_remaining: 400,
        oil_warning: false,
      })?.oilRemaining
    ).toBeNull();
  });
});
