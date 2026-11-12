import { describe, expect, it } from "vitest";
import { validateReservationFormInput } from "../utils/validateReservationFormInput";
import { VALID_RESERVATION_FORM_INPUT } from "./validateReservationFormInput.constants";
import { VALID_EXTRA_IDS } from "./validateReservationFormInput.constants";

describe("validateReservationFormInput extra identifiers", () => {
  it("passes selected extra identifiers into the validated input", () => {
    const result = validateReservationFormInput({
      ...VALID_RESERVATION_FORM_INPUT,
      extraIds: VALID_EXTRA_IDS,
    });

    expect(result.value?.extraIds).toEqual(VALID_EXTRA_IDS);
  });

  it("defaults legacy input without extra identifiers to an empty list", () => {
    const legacyInput = {
      ...VALID_RESERVATION_FORM_INPUT,
    };
    delete legacyInput.extraIds;
    const result =
      validateReservationFormInput(legacyInput);

    expect(result.value?.extraIds).toEqual([]);
  });
});
