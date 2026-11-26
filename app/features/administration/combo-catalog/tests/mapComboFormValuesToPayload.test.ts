import { describe, expect, it } from "vitest";
import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";
import { mapComboFormValuesToPayload } from "../utils/mapComboFormValuesToPayload";
import {
  FAKE_COMBO_ID,
  FOREIGN_PRICE,
} from "./Combo.constants";
import {
  buildComboFormValues,
  EXPECTED_SAVE_PAYLOAD,
  FAKE_COMBO_NAME,
  FOREIGN_PRICE_COMMA_TEXT,
  PADDED_COMBO_NAME,
  VALID_COMBO_FORM_VALUES,
} from "./ComboForm.constants";

describe("mapComboFormValuesToPayload", () => {
  it("builds a create payload without a combo id", () => {
    const payload = mapComboFormValuesToPayload(
      VALID_COMBO_FORM_VALUES
    );

    expect(payload).toEqual(EXPECTED_SAVE_PAYLOAD);
    expect(payload).not.toHaveProperty("combo_id");
  });

  it("adds the combo id when editing", () => {
    expect(
      mapComboFormValuesToPayload(
        VALID_COMBO_FORM_VALUES,
        FAKE_COMBO_ID
      )
    ).toEqual({
      ...EXPECTED_SAVE_PAYLOAD,
      combo_id: FAKE_COMBO_ID,
    });
  });

  it("trims the name and reads a comma decimal as a number", () => {
    const payload = mapComboFormValuesToPayload(
      buildComboFormValues({
        audience: COMBO_AUDIENCE.FOREIGN,
        name: PADDED_COMBO_NAME,
        priceText: FOREIGN_PRICE_COMMA_TEXT,
      })
    );

    expect(payload.name).toBe(FAKE_COMBO_NAME);
    expect(payload.package_price).toBe(FOREIGN_PRICE);
    expect(payload.audience).toBe(COMBO_AUDIENCE.FOREIGN);
  });
});
