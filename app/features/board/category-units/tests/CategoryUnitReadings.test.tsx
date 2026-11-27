import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryUnitRow from "../components/CategoryUnitRow";
import type { CategoryUnit } from "../models/CategoryUnit.interface";
import type { CategoryUnitReadings } from "../models/CategoryUnitReadings.interface";
import { DEFAULT_CATEGORY_UNIT } from "./CategoryUnits.constants";

const ENGINE_HOURS_READINGS: CategoryUnitReadings = {
  fuelLevel: 3,
  fuelMax: 4,
  hasFuelGauge: true,
  impactCount: 2,
  lowFuelLines: 1,
  oilRemaining: null,
  usageMetric: "engine_hours",
  usageTotal: 97.5,
};

const KILOMETERS_READINGS: CategoryUnitReadings = {
  fuelLevel: null,
  fuelMax: 6,
  hasFuelGauge: false,
  impactCount: 0,
  lowFuelLines: 1,
  oilRemaining: null,
  usageMetric: "kilometers",
  usageTotal: 1250,
};

const UNIT_PHOTO = {
  alt: "",
  source: "/images/equipment/jet-ski.webp",
};

const renderUnit = (
  readings: CategoryUnit["readings"],
  image: Parameters<
    typeof CategoryUnitRow
  >[0]["image"] = null
) =>
  render(
    <CategoryUnitRow
      image={image}
      unit={{ ...DEFAULT_CATEGORY_UNIT, readings }}
    />
  );

describe("CategoryUnitRow readings", () => {
  it("shows the fuel lines and the engine hours of a motor unit", () => {
    renderUnit(ENGINE_HOURS_READINGS);

    expect(
      screen.getByRole("img", { name: "Gasolina: 3 de 4" })
    ).toBeInTheDocument();
    expect(
      screen.queryByText("3 de 4")
    ).not.toBeInTheDocument();
    expect(screen.getByText("97,5 h")).toBeInTheDocument();
  });

  it("shows the kilometers without a fuel gauge", () => {
    renderUnit(KILOMETERS_READINGS);

    expect(
      screen.getByText(/1.*250 km/)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/ de 6/)
    ).not.toBeInTheDocument();
  });

  it("says a unit never read has no fuel reading yet", () => {
    renderUnit({
      ...ENGINE_HOURS_READINGS,
      fuelLevel: null,
    });

    expect(
      screen.queryByText("0 de 4")
    ).not.toBeInTheDocument();
  });

  it("shows no reading at all for a category without motor", () => {
    renderUnit(null);

    expect(
      screen.queryByText(/ h$/)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/ km$/)
    ).not.toBeInTheDocument();
  });

  it("shows the photo of the equipment when there is one", () => {
    const { container } = renderUnit(null, UNIT_PHOTO);

    expect(container.querySelector("img")).not.toBeNull();
  });

  it("keeps a placeholder when the category has no photo", () => {
    const { container } = renderUnit(null);

    expect(container.querySelector("img")).toBeNull();
  });
});
