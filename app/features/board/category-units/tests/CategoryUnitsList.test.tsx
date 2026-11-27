import { within } from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CATEGORY_UNITS,
  DEFAULT_UNIT_OCCUPANCY,
  FAKE_TIMER_OPTIONS,
  NON_OCCUPIED_UNIT_CODES,
  UNIT_CODE,
} from "./CategoryUnits.constants";
import { renderCategoryUnitsList } from "./renderCategoryUnitsList";

describe("CategoryUnitsList", () => {
  beforeEach(() => {
    vi.useFakeTimers(FAKE_TIMER_OPTIONS);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders one row per unit in a named list", () => {
    const page = renderCategoryUnitsList();

    expect(page.getUnits()).toHaveLength(
      CATEGORY_UNITS.length
    );
  });

  it("keeps the customer and the reservation off the card of an occupied unit", () => {
    const page = renderCategoryUnitsList();
    const unit = page.getUnit(UNIT_CODE.OCCUPIED);

    expect(
      within(unit).queryByText(
        DEFAULT_UNIT_OCCUPANCY.customerName
      )
    ).not.toBeInTheDocument();
    expect(
      within(unit).queryByText(
        new RegExp(DEFAULT_UNIT_OCCUPANCY.reservationCode)
      )
    ).not.toBeInTheDocument();
  });

  it("shows no occupied detail on a unit that is not occupied", () => {
    const page = renderCategoryUnitsList();

    NON_OCCUPIED_UNIT_CODES.forEach((code) => {
      expect(
        page.queryReturnText(page.getUnit(code))
      ).toBeNull();
    });
  });

  it("has no link or button on any row", () => {
    const page = renderCategoryUnitsList();

    page.getUnits().forEach((unit) => {
      expect(
        page.getInteractiveElements(unit)
      ).toHaveLength(0);
    });
  });
});
