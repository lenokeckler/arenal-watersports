import { describe, expect, it } from "vitest";
import { EXTRA_OCCUPANCY_COPY } from "../constants/ExtraOccupancyCopy.constants";
import { validateExtraFormInput } from "../utils/validateExtraFormInput";
import {
  FAKE_OCCUPIED_CATEGORY_ID,
  FAKE_OCCUPIED_QUANTITY_TEXT,
} from "./Extra.constants";
import { VALID_EXTRA_FORM_VALUES } from "./ExtraForm.constants";

describe("validateExtraFormInput", () => {
  it("accepts blank occupancy while the switch is off", () => {
    expect(
      validateExtraFormInput(VALID_EXTRA_FORM_VALUES, false)
    ).toEqual({});
  });

  it("asks for the equipment and quantity when the switch is on and both are blank", () => {
    expect(
      validateExtraFormInput(VALID_EXTRA_FORM_VALUES, true)
    ).toEqual({
      occupancy: EXTRA_OCCUPANCY_COPY.INCOMPLETE_ERROR,
    });
  });

  it("accepts a complete occupancy while the switch is on", () => {
    expect(
      validateExtraFormInput(
        {
          ...VALID_EXTRA_FORM_VALUES,
          occupiesCategoryId: FAKE_OCCUPIED_CATEGORY_ID,
          occupiesQuantity: FAKE_OCCUPIED_QUANTITY_TEXT,
        },
        true
      )
    ).toEqual({});
  });
});
