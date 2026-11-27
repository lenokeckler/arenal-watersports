import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { validateExtraOccupancy } from "../utils/validateExtraOccupancy";
import {
  EXTRA_OCCUPANCY_INPUT_CASES,
  VALID_OCCUPANCY_INPUT,
} from "./ExtraOccupancy.constants";

describe("validateExtraOccupancy", () => {
  it.each([
    VALID_OCCUPANCY_INPUT,
    {
      occupiesCategoryId: STRING.Empty,
      occupiesQuantity: STRING.Empty,
    },
    {},
    null,
  ])("accepts %j", (input) => {
    expect(validateExtraOccupancy(input)).toEqual({});
  });

  it.each(EXTRA_OCCUPANCY_INPUT_CASES)(
    "rejects $description",
    ({ input, expectedError }) => {
      expect(validateExtraOccupancy(input)).toEqual({
        occupancy: expectedError,
      });
    }
  );
});
