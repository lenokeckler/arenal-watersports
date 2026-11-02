import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { LENGTH } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_UNIT_CUSTOMER_CLASS,
  CATEGORY_UNIT_REFERENCE_CLASS,
  CATEGORY_UNIT_RETURN_CLASS,
  CATEGORY_UNIT_ROW_CODE_CLASS,
  CATEGORY_UNIT_ROW_MIN_HEIGHT_CLASS,
} from "../styles/CategoryUnitRow.styles";
import { CATEGORY_UNITS_LIST_CLASS } from "../styles/CategoryUnits.styles";
import { CATEGORY_UNITS_SKELETON_ROW_CLASS } from "../styles/CategoryUnitsState.styles";
import {
  DEFAULT_UNIT_OCCUPANCY,
  FAKE_TIMER_OPTIONS,
  NON_OCCUPIED_UNIT_CODES,
  RESERVATION_WINDOW,
  UNIT_CODE,
} from "./CategoryUnits.constants";
import { renderCategoryUnitsList } from "./renderCategoryUnitsList";

describe("CategoryUnitRow design", () => {
  beforeEach(() => {
    vi.useFakeTimers(FAKE_TIMER_OPTIONS);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("styles the code as the title of the card", () => {
    const page = renderCategoryUnitsList();

    expect(
      page.getCode(page.getUnit(UNIT_CODE.OCCUPIED))
    ).toHaveClass(CATEGORY_UNIT_ROW_CODE_CLASS);
  });

  it("puts the return time first and stronger than the customer and the reservation", () => {
    const page = renderCategoryUnitsList();
    const unit = page.getUnit(UNIT_CODE.OCCUPIED);
    const returnText = page.getReturnText(unit);
    const customer = page.getText(
      unit,
      CATEGORY_UNITS_COPY.CUSTOMER_LINE(
        DEFAULT_UNIT_OCCUPANCY.customerName
      )
    );
    const reference = page.getText(
      unit,
      CATEGORY_UNITS_COPY.RESERVATION_LINE(
        DEFAULT_UNIT_OCCUPANCY.reservationCode,
        RESERVATION_WINDOW.EXPECTED
      )
    );

    expect(page.precedes(returnText, customer)).toBe(true);
    expect(page.precedes(customer, reference)).toBe(true);
    expect(returnText).toHaveClass(
      CATEGORY_UNIT_RETURN_CLASS
    );
    expect(customer).toHaveClass(
      CATEGORY_UNIT_CUSTOMER_CLASS
    );
    expect(reference).toHaveClass(
      CATEGORY_UNIT_REFERENCE_CLASS
    );
  });

  it("renders a unit without extra info as a single compact row with its minimum height", () => {
    const page = renderCategoryUnitsList();

    NON_OCCUPIED_UNIT_CODES.forEach((code) => {
      const unit = page.getUnit(code);

      expect(page.getRowSectionCount(unit)).toBe(
        LENGTH.ONE
      );
      expect(page.getRow(unit)).toHaveClass(
        CATEGORY_UNIT_ROW_MIN_HEIGHT_CLASS
      );
    });
  });

  it("expands the occupied row with a detail block next to the header", () => {
    const page = renderCategoryUnitsList();

    expect(
      page.getRowSectionCount(
        page.getUnit(UNIT_CODE.OCCUPIED)
      )
    ).toBeGreaterThan(LENGTH.ONE);
  });

  it("keeps each row at its own height inside the grid", () => {
    const page = renderCategoryUnitsList();

    expect(page.getList()).toHaveClass(
      CATEGORY_UNITS_LIST_CLASS
    );
  });

  it("sizes the loading skeleton rows like the final rows", () => {
    expect(CATEGORY_UNITS_SKELETON_ROW_CLASS).toContain(
      CATEGORY_UNIT_ROW_MIN_HEIGHT_CLASS
    );
  });
});
