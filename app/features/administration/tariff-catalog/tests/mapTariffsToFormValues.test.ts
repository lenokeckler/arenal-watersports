import { describe, expect, it } from "vitest";
import { mapTariffsToFormValues } from "../utils/mapTariffsToFormValues";
import {
  buildFormValues,
  EXISTING_TARIFFS,
  FILLED_FORM_VALUES,
  NO_EXISTING_TARIFFS,
} from "./TariffForm.constants";

describe("mapTariffsToFormValues", () => {
  it("writes the existing amounts as text", () => {
    expect(
      mapTariffsToFormValues(EXISTING_TARIFFS)
    ).toEqual(FILLED_FORM_VALUES);
  });

  it("leaves a type without a tariff blank", () => {
    expect(
      mapTariffsToFormValues(NO_EXISTING_TARIFFS)
    ).toEqual(buildFormValues());
  });
});
