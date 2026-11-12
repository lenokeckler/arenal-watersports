import { render } from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { useReservationExtraOptions } from "../hooks/useReservationExtraOptions";
import type { ReservationExtraOption } from "../models/ReservationExtraOption.interface";
import CustomComboUnitExtras from "../components/CustomComboUnitExtras";
import { createCustomComboUnitExtrasPage } from "./CustomComboUnitExtras.page";
import { CUSTOM_COMBO_UNIT_EXTRAS_TEST } from "./CustomComboUnitExtras.constants";

vi.mock("../hooks/useReservationExtraOptions", () => ({
  useReservationExtraOptions: vi.fn(),
}));

describe("CustomComboUnitExtras", () => {
  beforeEach(() => {
    vi.mocked(useReservationExtraOptions).mockReturnValue({
      error: null,
      isLoading: false,
      options: [
        {
          id: CUSTOM_COMBO_UNIT_EXTRAS_TEST.EXTRA_ID,
          name: CUSTOM_COMBO_UNIT_EXTRAS_TEST.EXTRA_NAME,
          occupiesCategoryId:
            CUSTOM_COMBO_UNIT_EXTRAS_TEST.INVENTORY_CATEGORY_ID,
          occupiesQuantity:
            CUSTOM_COMBO_UNIT_EXTRAS_TEST.INVENTORY_QUANTITY,
          priceCrc: CUSTOM_COMBO_UNIT_EXTRAS_TEST.PRICE_CRC,
          priceUsd: CUSTOM_COMBO_UNIT_EXTRAS_TEST.PRICE_USD,
        } satisfies ReservationExtraOption,
      ],
      retry: vi.fn(),
    });
  });

  it("loads compatible extras and forwards selection for the concrete unit", async () => {
    const onToggle = vi.fn();
    const { container } = render(
      <CustomComboUnitExtras
        extraIds={[]}
        onToggle={onToggle}
        unitId={CUSTOM_COMBO_UNIT_EXTRAS_TEST.UNIT_ID}
      />
    );
    const page = createCustomComboUnitExtrasPage(container);

    expect(useReservationExtraOptions).toHaveBeenCalledWith(
      CUSTOM_COMBO_UNIT_EXTRAS_TEST.UNIT_ID,
      expect.any(String)
    );
    expect(page.getInventoryNote()).toBeInTheDocument();
    await page.toggleExtra(
      CUSTOM_COMBO_UNIT_EXTRAS_TEST.EXTRA_NAME
    );

    expect(onToggle).toHaveBeenCalledWith(
      CUSTOM_COMBO_UNIT_EXTRAS_TEST.UNIT_ID,
      CUSTOM_COMBO_UNIT_EXTRAS_TEST.EXTRA_ID
    );
  });
});
