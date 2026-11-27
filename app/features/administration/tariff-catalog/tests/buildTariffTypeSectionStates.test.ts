import { describe, expect, it } from "vitest";
import { TARIFF_TYPE } from "../constants/TariffType.constants";
import { TARIFF_TYPE_SECTION_STATE } from "../constants/TariffTypeSectionState.constants";
import { buildTariffTypeSectionStates } from "../utils/buildTariffTypeSectionStates";
import { buildCatalogRow } from "./TariffCatalog.constants";

describe("buildTariffTypeSectionStates", () => {
  it("marks a type with a saved tariff as saved and one without as empty", () => {
    expect(
      buildTariffTypeSectionStates(
        buildCatalogRow({ tour: null })
      )
    ).toEqual({
      [TARIFF_TYPE.RENTAL]: TARIFF_TYPE_SECTION_STATE.SAVED,
      [TARIFF_TYPE.TOUR]: TARIFF_TYPE_SECTION_STATE.EMPTY,
    });
  });
});
