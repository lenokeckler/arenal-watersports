import { describe, expect, it } from "vitest";
import { parseSetCategoryImageInput } from "../utils/parseSetCategoryImageInput";
import {
  INVALID_SET_INPUTS,
  NON_RECORD_INPUTS,
  VALID_SET_INPUT,
} from "./CategoryImage.constants";

describe("parseSetCategoryImageInput", () => {
  it("returns the category id and the image path of a valid input", () => {
    expect(
      parseSetCategoryImageInput(VALID_SET_INPUT)
    ).toEqual(VALID_SET_INPUT);
  });

  it("drops fields the contract does not name", () => {
    expect(
      parseSetCategoryImageInput({
        ...VALID_SET_INPUT,
        isAdmin: true,
      })
    ).toEqual(VALID_SET_INPUT);
  });

  it.each(NON_RECORD_INPUTS)(
    "rejects the non-record input %j",
    (input) => {
      expect(parseSetCategoryImageInput(input)).toBeNull();
    }
  );

  it.each(INVALID_SET_INPUTS)(
    "rejects the malformed input %j",
    (input) => {
      expect(parseSetCategoryImageInput(input)).toBeNull();
    }
  );
});
