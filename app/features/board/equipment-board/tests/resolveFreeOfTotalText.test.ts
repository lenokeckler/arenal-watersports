import { describe, expect, it } from "vitest";
import { resolveFreeOfTotalText } from "../utils/resolveFreeOfTotalText";
import { FREE_OF_TOTAL_CASES } from "./EquipmentBoardUtils.constants";

describe("resolveFreeOfTotalText", () => {
  it.each(FREE_OF_TOTAL_CASES)(
    "writes $freeCount free of $totalCount as $expected",
    ({ expected, freeCount, totalCount }) => {
      expect(
        resolveFreeOfTotalText(freeCount, totalCount)
      ).toBe(expected);
    }
  );
});
