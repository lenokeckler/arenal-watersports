import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { CATEGORY_UNIT_STATUS_LABEL } from "../constants/CategoryUnitsCopy.constants";
import {
  FAKE_TIMER_OPTIONS,
  STATUS_BY_UNIT_CODE,
  UNIT_CODE,
} from "./CategoryUnits.constants";
import { renderCategoryUnitsList } from "./renderCategoryUnitsList";

describe("CategoryUnitStatusChip", () => {
  beforeEach(() => {
    vi.useFakeTimers(FAKE_TIMER_OPTIONS);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each(Object.entries(STATUS_BY_UNIT_CODE))(
    "shows unit %s with the Spanish label of its status",
    (code, status) => {
      const page = renderCategoryUnitsList();

      expect(
        page.getText(
          page.getUnit(code),
          CATEGORY_UNIT_STATUS_LABEL[status]
        )
      ).toBeInTheDocument();
    }
  );

  it("labels the repair status apart from maintenance", () => {
    expect(
      CATEGORY_UNIT_STATUS_LABEL[
        INVENTORY_UNIT_STATUS.IN_REPAIR
      ]
    ).not.toBe(
      CATEGORY_UNIT_STATUS_LABEL[
        INVENTORY_UNIT_STATUS.IN_MAINTENANCE
      ]
    );
  });

  it("hides the status dot from assistive technology and keeps the status as text", () => {
    const page = renderCategoryUnitsList();
    const unit = page.getUnit(UNIT_CODE.DAMAGED);

    expect(page.getDecorativeElements(unit)).toHaveLength(
      1
    );
    expect(page.getUnitText(unit)).toContain(
      CATEGORY_UNIT_STATUS_LABEL[
        INVENTORY_UNIT_STATUS.DAMAGED
      ]
    );
  });
});
