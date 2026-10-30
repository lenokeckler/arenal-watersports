import { describe, expect, it, vi } from "vitest";
import { UNIT_LIST_COPY } from "../constants/UnitListCopy.constants";
import { UNIT_USAGE_METRIC } from "../constants/UnitUsageMetric.constants";
import { UNIT_USAGE_UNIT_LABEL } from "../constants/UnitUsageUnitLabel.constants";
import {
  buildUnitCategory,
  buildUnitListItem,
  DEFAULT_UNIT_LIST_ITEM,
} from "./UnitList.constants";
import { createUnitListPage } from "./UnitList.page";
import { renderUnitListView } from "./renderUnitListView";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

const UNIT_CODE = DEFAULT_UNIT_LIST_ITEM.code;
const HOURS_LABEL =
  UNIT_USAGE_UNIT_LABEL[UNIT_USAGE_METRIC.ENGINE_HOURS];
const FUEL_TEXT = `${UNIT_LIST_COPY.FUEL_LABEL} ${DEFAULT_UNIT_LIST_ITEM.fuelLevel} ${UNIT_LIST_COPY.FUEL_LEVEL_OF} ${DEFAULT_UNIT_LIST_ITEM.fuelMax}`;
const USAGE_TEXT = `${UNIT_LIST_COPY.USAGE_LABEL} ${DEFAULT_UNIT_LIST_ITEM.usageTotal} ${HOURS_LABEL}`;
const OIL_CHANGE_TEXT = `${UNIT_LIST_COPY.NEXT_OIL_CHANGE_LABEL} ${DEFAULT_UNIT_LIST_ITEM.nextOilChangeAt} ${HOURS_LABEL}`;
const NO_READING_TEXT = `${UNIT_LIST_COPY.FUEL_LABEL} ${UNIT_LIST_COPY.FUEL_NO_READING}`;
const MOTOR_TEXTS = [
  FUEL_TEXT,
  USAGE_TEXT,
  OIL_CHANGE_TEXT,
];

describe("UnitListView motor details", () => {
  it.each(MOTOR_TEXTS)(
    "shows %s for a motorized category",
    (detailText) => {
      renderUnitListView();

      expect(
        createUnitListPage().getText(detailText)
      ).toBeInTheDocument();
    }
  );

  it("says there is no reading when the fuel level was never recorded", () => {
    renderUnitListView({
      units: [buildUnitListItem({ fuelLevel: null })],
    });

    expect(
      createUnitListPage().getText(NO_READING_TEXT)
    ).toBeInTheDocument();
  });

  it("hides fuel, usage and oil change when the category has no motor", () => {
    renderUnitListView({
      category: buildUnitCategory({
        hasMotor: false,
        usageMetric: null,
      }),
    });
    const unitListPage = createUnitListPage();

    MOTOR_TEXTS.forEach((detailText) => {
      expect(unitListPage.getText(detailText)).toBeNull();
    });
    expect(
      unitListPage.getCard(UNIT_CODE)
    ).toBeInTheDocument();
  });
});
