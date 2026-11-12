import { describe, expect, it } from "vitest";
import { EQUIPMENT_BOARD_COPY } from "../constants/EquipmentBoardCopy.constants";
import { resolveFreeLabel } from "../utils/resolveFreeLabel";
import { FREE_LABEL_COUNTS } from "./EquipmentBoard.constants";

describe("resolveFreeLabel", () => {
  it("uses the singular for exactly one free unit", () => {
    expect(resolveFreeLabel(FREE_LABEL_COUNTS.ONE)).toBe(
      EQUIPMENT_BOARD_COPY.FREE_LABEL_SINGULAR
    );
  });

  it("uses the plural for zero free units", () => {
    expect(resolveFreeLabel(FREE_LABEL_COUNTS.ZERO)).toBe(
      EQUIPMENT_BOARD_COPY.FREE_LABEL_PLURAL
    );
  });

  it("uses the plural for several free units", () => {
    expect(resolveFreeLabel(FREE_LABEL_COUNTS.MANY)).toBe(
      EQUIPMENT_BOARD_COPY.FREE_LABEL_PLURAL
    );
  });
});
