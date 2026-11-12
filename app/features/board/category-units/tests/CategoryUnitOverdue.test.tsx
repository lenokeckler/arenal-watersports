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
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import {
  CATEGORY_UNIT_STATUS_LABEL,
  CATEGORY_UNITS_COPY,
} from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_UNIT_OVERDUE_CHIP_CLASS,
  CATEGORY_UNIT_RETURN_OVERDUE_CLASS,
  CATEGORY_UNIT_ROW_OVERDUE_CLASS,
} from "../styles/CategoryUnitRow.styles";
import {
  DEFAULT_CATEGORY_UNIT,
  EXPECTED_OVERDUE,
  FAKE_TIMER_OPTIONS,
  OCCUPIED_CATEGORY_UNIT,
  RETURNS_OVERDUE_TODAY,
  RETURNS_OVERDUE_YESTERDAY,
} from "./CategoryUnits.constants";
import { createCategoryUnitsPage } from "./CategoryUnits.page";
import { createOverdueUnit } from "./createOverdueUnit";

const renderRow = (
  unit = createOverdueUnit(RETURNS_OVERDUE_TODAY)
) => {
  const { container } = render(
    <CategoryUnitRow unit={unit} />
  );

  return {
    page: createCategoryUnitsPage(),
    row: container,
  };
};

describe("CategoryUnitRow overdue return", () => {
  beforeEach(() => {
    vi.useFakeTimers(FAKE_TIMER_OPTIONS);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("reads the return as late, with the time only when it was today", () => {
    const { page, row } = renderRow();

    expect(
      page.getText(
        row,
        CATEGORY_UNITS_COPY.OVERDUE_RETURNS_AT(
          EXPECTED_OVERDUE.TIME_TODAY
        )
      )
    ).toHaveClass(CATEGORY_UNIT_RETURN_OVERDUE_CLASS);
  });

  it("adds the date when the late return was another day", () => {
    const { page, row } = renderRow(
      createOverdueUnit(RETURNS_OVERDUE_YESTERDAY)
    );

    expect(
      page.getText(
        row,
        CATEGORY_UNITS_COPY.OVERDUE_RETURNS_ON(
          EXPECTED_OVERDUE.DATE_YESTERDAY,
          EXPECTED_OVERDUE.TIME_YESTERDAY
        )
      )
    ).toBeInTheDocument();
  });

  it("shows the overdue chip next to the Ocupada status and tints the row", () => {
    const { page, row } = renderRow();

    expect(
      page.getText(row, CATEGORY_UNITS_COPY.OVERDUE_CHIP)
        .parentElement
    ).toHaveClass(CATEGORY_UNIT_OVERDUE_CHIP_CLASS);
    expect(
      page.getText(
        row,
        CATEGORY_UNIT_STATUS_LABEL[
          INVENTORY_UNIT_STATUS.OCCUPIED
        ]
      )
    ).toBeInTheDocument();
    expect(row.firstElementChild).toHaveClass(
      CATEGORY_UNIT_ROW_OVERDUE_CLASS
    );
  });

  it("leaves an occupied unit that is on time unchanged", () => {
    const { page, row } = renderRow(OCCUPIED_CATEGORY_UNIT);

    expect(
      page.queryText(row, CATEGORY_UNITS_COPY.OVERDUE_CHIP)
    ).toBeNull();
    expect(page.getReturnText(row)).not.toHaveClass(
      CATEGORY_UNIT_RETURN_OVERDUE_CLASS
    );
    expect(row.firstElementChild).not.toHaveClass(
      CATEGORY_UNIT_ROW_OVERDUE_CLASS
    );
  });

  it("never marks an available unit", () => {
    const { page, row } = renderRow(DEFAULT_CATEGORY_UNIT);

    expect(
      page.queryText(row, CATEGORY_UNITS_COPY.OVERDUE_CHIP)
    ).toBeNull();
    expect(row.firstElementChild).not.toHaveClass(
      CATEGORY_UNIT_ROW_OVERDUE_CLASS
    );
  });
});
