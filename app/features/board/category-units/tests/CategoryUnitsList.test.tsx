import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_UNITS,
  DEFAULT_UNIT_OCCUPANCY,
  EXPECTED_TIME,
  FAKE_TIMER_OPTIONS,
  NON_OCCUPIED_UNIT_CODES,
  RESERVATION_WINDOW,
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

  it("shows return time, customer and reservation reference on the occupied unit", () => {
    const page = renderCategoryUnitsList();
    const unit = page.getUnit(UNIT_CODE.OCCUPIED);

    expect(
      page.getText(
        unit,
        CATEGORY_UNITS_COPY.RETURNS_AT(EXPECTED_TIME.TODAY)
      )
    ).toBeInTheDocument();
    expect(
      page.getText(
        unit,
        CATEGORY_UNITS_COPY.CUSTOMER_LINE(
          DEFAULT_UNIT_OCCUPANCY.customerName
        )
      )
    ).toBeInTheDocument();
    expect(
      page.getText(
        unit,
        CATEGORY_UNITS_COPY.RESERVATION_LINE(
          DEFAULT_UNIT_OCCUPANCY.reservationCode,
          RESERVATION_WINDOW.EXPECTED
        )
      )
    ).toBeInTheDocument();
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
