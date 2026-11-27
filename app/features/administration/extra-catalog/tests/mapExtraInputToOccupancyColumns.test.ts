import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { mapExtraInputToOccupancyColumns } from "../utils/mapExtraInputToOccupancyColumns";
import { VALID_EXTRA_FORM_VALUES } from "./ExtraForm.constants";
import {
  CHARGE_ONLY_COLUMNS,
  OCCUPYING_COLUMNS,
  VALID_OCCUPANCY_INPUT,
} from "./ExtraOccupancy.constants";

describe("mapExtraInputToOccupancyColumns", () => {
  it("sends both columns null when no category is chosen", () => {
    expect(
      mapExtraInputToOccupancyColumns(
        VALID_EXTRA_FORM_VALUES
      )
    ).toStrictEqual(CHARGE_ONLY_COLUMNS);
  });

  it("parses the quantity text to a number", () => {
    expect(
      mapExtraInputToOccupancyColumns({
        ...VALID_EXTRA_FORM_VALUES,
        ...VALID_OCCUPANCY_INPUT,
      })
    ).toStrictEqual(OCCUPYING_COLUMNS);
  });

  it("treats a blank category as no occupancy", () => {
    expect(
      mapExtraInputToOccupancyColumns({
        ...VALID_EXTRA_FORM_VALUES,
        occupiesCategoryId: "   ",
        occupiesQuantity: STRING.Empty,
      })
    ).toStrictEqual(CHARGE_ONLY_COLUMNS);
  });
});
