import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render } from "@testing-library/react";
import CategoryUnitRow from "../components/CategoryUnitRow";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  EXPECTED_TIME,
  EXPECTED_TOMORROW_DATE,
  FAKE_TIMER_OPTIONS,
  RETURNS_TODAY_AFTER_UTC_MIDNIGHT,
  RETURNS_TODAY_UTC,
  RETURNS_TOMORROW,
} from "./CategoryUnits.constants";
import { createCategoryUnitsPage } from "./CategoryUnits.page";
import { createOccupiedUnitReturning } from "./createOccupiedUnitReturning";

const renderReturningAt = (returnsAt: string) => {
  const { container } = render(
    <CategoryUnitRow
      unit={createOccupiedUnitReturning(returnsAt)}
    />
  );

  return {
    page: createCategoryUnitsPage(),
    row: container,
  };
};

describe("CategoryUnitRow return time", () => {
  beforeEach(() => {
    vi.useFakeTimers(FAKE_TIMER_OPTIONS);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows only the time, in Costa Rica time, when the unit returns today", () => {
    const { page, row } = renderReturningAt(
      RETURNS_TODAY_UTC
    );

    expect(
      page.getText(
        row,
        CATEGORY_UNITS_COPY.RETURNS_AT(EXPECTED_TIME.TODAY)
      )
    ).toBeInTheDocument();
  });

  it("still counts as today after UTC midnight while it is evening in Costa Rica", () => {
    const { page, row } = renderReturningAt(
      RETURNS_TODAY_AFTER_UTC_MIDNIGHT
    );

    expect(
      page.getText(
        row,
        CATEGORY_UNITS_COPY.RETURNS_AT(
          EXPECTED_TIME.AFTER_UTC_MIDNIGHT
        )
      )
    ).toBeInTheDocument();
  });

  it("adds the date when the unit returns on another day", () => {
    const { page, row } = renderReturningAt(
      RETURNS_TOMORROW
    );

    expect(
      page.getText(
        row,
        CATEGORY_UNITS_COPY.RETURNS_ON(
          EXPECTED_TOMORROW_DATE,
          EXPECTED_TIME.TOMORROW
        )
      )
    ).toBeInTheDocument();
  });
});
