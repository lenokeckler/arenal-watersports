import {
  pushMock,
  renderTariffViewModel,
} from "./tariffForm.harness";
import { act } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { TARIFF_TYPE } from "../constants/TariffType.constants";
import { mapTariffsToFormValues } from "../utils/mapTariffsToFormValues";
import { FAKE_CATEGORY_NAME } from "./TariffCatalog.constants";
import {
  EXISTING_TARIFFS,
  TOUR_USD_TEXT,
} from "./TariffForm.constants";
import { buildTariffFormFieldChangeEvent } from "./buildTariffFormFieldChangeEvent";

const CHANGED_TEXT = "99";

describe("useTariffFormViewModel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("starts from the saved prices and titles with the category name", () => {
    const { result } = renderTariffViewModel();

    expect(result.current.title).toBe(FAKE_CATEGORY_NAME);
    expect(result.current.values).toEqual(
      mapTariffsToFormValues(EXISTING_TARIFFS)
    );
    expect(result.current.values.tour.usdText).toBe(
      TOUR_USD_TEXT
    );
  });

  it("changes only the field of the type it is bound to", () => {
    const { result } = renderTariffViewModel();

    act(() => {
      result.current.onPriceChange(
        TARIFF_TYPE.TOUR,
        "crcText"
      )(
        buildTariffFormFieldChangeEvent({
          value: CHANGED_TEXT,
        })
      );
    });

    expect(result.current.values.tour.crcText).toBe(
      CHANGED_TEXT
    );
    expect(result.current.values.rental).toEqual(
      mapTariffsToFormValues(EXISTING_TARIFFS).rental
    );
  });

  it("goes back to the tariff list", () => {
    const { result } = renderTariffViewModel();

    result.current.onBack();

    expect(pushMock).toHaveBeenCalledWith(
      PATHS.ADMINISTRATION.TARIFFS
    );
  });
});
