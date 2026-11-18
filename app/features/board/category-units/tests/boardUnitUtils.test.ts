import { describe, expect, it } from "vitest";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import { CATEGORY_UNIT_ROW_KIND } from "../constants/CategoryUnits.constants";
import { buildUnitOccupancy } from "../utils/buildUnitOccupancy";
import { resolveCategoryUnitRowKind } from "../utils/resolveCategoryUnitRowKind";
import { resolveRecordedUnitStatus } from "../utils/resolveRecordedUnitStatus";
import {
  NOW,
  DEFAULT_UNIT_OCCUPANCY,
} from "./CategoryUnits.constants";
import {
  MOTOR_AVAILABLE_UNIT,
  MOTOR_OCCUPIED_UNIT,
  PLAIN_UNIT,
} from "./CategoryUnitsBoard.constants";
import {
  INCOMPLETE_OCCUPIED_ROW_OVERRIDES,
  OCCUPIED_BOARD_UNIT_ROW,
} from "./CategoryUnitRows.constants";

const INTERACTION = {
  isEditing: false,
  onOpenInfo: () => undefined,
  onOpenModify: () => undefined,
};
const EDITING = { ...INTERACTION, isEditing: true };

describe("resolveCategoryUnitRowKind", () => {
  it("lets an available unit be selected to dispatch", () => {
    expect(
      resolveCategoryUnitRowKind({
        hasSelection: true,
        interaction: INTERACTION,
        unit: MOTOR_AVAILABLE_UNIT,
      })
    ).toBe(CATEGORY_UNIT_ROW_KIND.SELECT);
  });

  it("opens who has an occupied unit", () => {
    expect(
      resolveCategoryUnitRowKind({
        hasSelection: true,
        interaction: INTERACTION,
        unit: MOTOR_OCCUPIED_UNIT,
      })
    ).toBe(CATEGORY_UNIT_ROW_KIND.INFO);
  });

  it("opens the edit panel of every motor unit while editing", () => {
    expect(
      resolveCategoryUnitRowKind({
        hasSelection: true,
        interaction: EDITING,
        unit: MOTOR_AVAILABLE_UNIT,
      })
    ).toBe(CATEGORY_UNIT_ROW_KIND.MODIFY);
    expect(
      resolveCategoryUnitRowKind({
        hasSelection: true,
        interaction: EDITING,
        unit: MOTOR_OCCUPIED_UNIT,
      })
    ).toBe(CATEGORY_UNIT_ROW_KIND.MODIFY);
  });

  it("leaves a unit without a motor alone while editing", () => {
    expect(
      resolveCategoryUnitRowKind({
        hasSelection: true,
        interaction: EDITING,
        unit: PLAIN_UNIT,
      })
    ).toBe(CATEGORY_UNIT_ROW_KIND.PLAIN);
  });

  it("is only a card when nobody can act on it", () => {
    expect(
      resolveCategoryUnitRowKind({
        hasSelection: false,
        unit: MOTOR_OCCUPIED_UNIT,
      })
    ).toBe(CATEGORY_UNIT_ROW_KIND.PLAIN);
  });
});

describe("resolveRecordedUnitStatus", () => {
  it("records an occupied unit as available", () => {
    expect(
      resolveRecordedUnitStatus(
        INVENTORY_UNIT_STATUS.OCCUPIED
      )
    ).toBe(INVENTORY_UNIT_STATUS.AVAILABLE);
  });

  it.each([
    INVENTORY_UNIT_STATUS.AVAILABLE,
    INVENTORY_UNIT_STATUS.DAMAGED,
    INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
    INVENTORY_UNIT_STATUS.IN_REPAIR,
  ])("keeps %s as it is", (status) => {
    expect(resolveRecordedUnitStatus(status)).toBe(status);
  });
});

describe("buildUnitOccupancy dispatch data", () => {
  it("carries the dispatch, the people and the radio channel", () => {
    expect(
      buildUnitOccupancy(OCCUPIED_BOARD_UNIT_ROW, NOW)
    ).toMatchObject({
      dispatchId: DEFAULT_UNIT_OCCUPANCY.dispatchId,
      dispatchedAt: DEFAULT_UNIT_OCCUPANCY.dispatchedAt,
      peopleCount: DEFAULT_UNIT_OCCUPANCY.peopleCount,
      radioChannel: DEFAULT_UNIT_OCCUPANCY.radioChannel,
    });
  });

  it("accepts an occupied unit without a radio channel", () => {
    expect(
      buildUnitOccupancy(
        { ...OCCUPIED_BOARD_UNIT_ROW, radio_channel: null },
        NOW
      ).radioChannel
    ).toBeNull();
  });

  it.each(INCOMPLETE_OCCUPIED_ROW_OVERRIDES)(
    "refuses an occupied unit with missing data %j",
    (override) => {
      expect(() =>
        buildUnitOccupancy(
          { ...OCCUPIED_BOARD_UNIT_ROW, ...override },
          NOW
        )
      ).toThrow();
    }
  );
});
