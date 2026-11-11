import { describe, expect, it } from "vitest";
import { EXTRA_INPUT_FIELD } from "../constants/ExtraInputField.constants";
import { readExtraInputField } from "../utils/readExtraInputField";
import { FAKE_EXTRA_PRICE_USD_TEXT } from "./Extra.constants";
import { VALID_EXTRA_FORM_VALUES } from "./ExtraForm.constants";

describe("readExtraInputField", () => {
  it("reads the named field of an input object", () => {
    expect(
      readExtraInputField(
        VALID_EXTRA_FORM_VALUES,
        EXTRA_INPUT_FIELD.PRICE_USD
      )
    ).toBe(FAKE_EXTRA_PRICE_USD_TEXT);
  });

  it("returns undefined when the object lacks the field", () => {
    expect(
      readExtraInputField({}, EXTRA_INPUT_FIELD.PRICE_CRC)
    ).toBeUndefined();
  });

  it.each([null, undefined, 42, "text"])(
    "returns undefined when the input is %j",
    (input) => {
      expect(
        readExtraInputField(input, EXTRA_INPUT_FIELD.NAME)
      ).toBeUndefined();
    }
  );
});
