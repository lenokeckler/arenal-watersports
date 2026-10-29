import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { CUSTOM_COMBO_TEST } from "./CustomCombo.constants";
import { createCustomComboPage } from "./CustomCombo.page";
import { renderReservationForm } from "./ReservationFormView.fixture";
import { RESERVATION_FORM_VIEW_TEST } from "./ReservationFormView.constants";

const { getPricingMock } = vi.hoisted(() => ({
  getPricingMock: vi.fn(),
}));

vi.mock("../actions/getCustomComboPricingAction", () => ({
  getCustomComboPricingAction: getPricingMock,
}));

beforeEach(() => {
  getPricingMock.mockResolvedValue({
    ok: true,
    pricing: {
      listAmountCrc: CUSTOM_COMBO_TEST.SUGGESTED_CRC_AMOUNT,
      listAmountUsd: CUSTOM_COMBO_TEST.SUGGESTED_USD_AMOUNT,
    },
  });
});

const createComboPricingPage = async () => {
  renderReservationForm();
  const page = createCustomComboPage(document.body);
  await page.selectComboWithCategory(
    RESERVATION_FORM_VIEW_TEST.CATEGORY_NAME
  );
  return page;
};

const mockPricingRefresh = (): void => {
  getPricingMock
    .mockResolvedValueOnce({
      ok: true,
      pricing: {
        listAmountCrc:
          CUSTOM_COMBO_TEST.SUGGESTED_CRC_AMOUNT,
        listAmountUsd:
          CUSTOM_COMBO_TEST.SUGGESTED_USD_AMOUNT,
      },
    })
    .mockResolvedValueOnce({
      ok: true,
      pricing: {
        listAmountCrc: CUSTOM_COMBO_TEST.UPDATED_CRC_AMOUNT,
        listAmountUsd:
          CUSTOM_COMBO_TEST.SUGGESTED_USD_AMOUNT,
      },
    });
};

describe("custom combo proposed pricing", () => {
  it("shows separate suggested prices for both currencies", async () => {
    const page = await createComboPricingPage();
    const pricing = await page.getPricingRegion();
    expect(pricing).toHaveTextContent(
      CUSTOM_COMBO_TEST.SUGGESTED_CRC_TEXT_FRAGMENT
    );
    expect(pricing).toHaveTextContent(
      CUSTOM_COMBO_TEST.SUGGESTED_USD_TEXT_FRAGMENT
    );
  });
});

describe("custom combo agreed amounts", () => {
  it("keeps currencies independent and allows clearing", async () => {
    const page = await createComboPricingPage();
    await page.fillAgreedAmount(
      CUSTOM_COMBO_FORM_COPY.CRC_AMOUNT,
      CUSTOM_COMBO_TEST.AGREED_CRC_AMOUNT
    );
    await page.fillAgreedAmount(
      CUSTOM_COMBO_FORM_COPY.USD_AMOUNT,
      CUSTOM_COMBO_TEST.AGREED_USD_AMOUNT
    );
    expect(
      page.getAgreedAmountInput(
        CUSTOM_COMBO_FORM_COPY.CRC_AMOUNT
      )
    ).toHaveValue(CUSTOM_COMBO_TEST.AGREED_CRC_VALUE);
    expect(
      page.getAgreedAmountInput(
        CUSTOM_COMBO_FORM_COPY.USD_AMOUNT
      )
    ).toHaveValue(CUSTOM_COMBO_TEST.AGREED_USD_VALUE);
    await page.fillAgreedAmount(
      CUSTOM_COMBO_FORM_COPY.CRC_AMOUNT,
      CUSTOM_COMBO_TEST.EMPTY_AMOUNT
    );
    expect(
      page.getAgreedAmountInput(
        CUSTOM_COMBO_FORM_COPY.CRC_AMOUNT
      )
    ).toHaveValue(null);
  });
});

describe("custom combo pricing refresh", () => {
  it("updates the visible proposal after duration changes", async () => {
    mockPricingRefresh();
    const page = await createComboPricingPage();
    expect(await page.getPricingRegion()).toHaveTextContent(
      CUSTOM_COMBO_TEST.SUGGESTED_CRC_TEXT_FRAGMENT
    );

    await page.selectDuration(
      RESERVATION_FORM_VIEW_TEST.PRESET_DURATION_LABEL
    );
    expect(
      await page.waitForPricingRegionText(
        CUSTOM_COMBO_TEST.UPDATED_CRC_TEXT_FRAGMENT
      )
    ).toHaveTextContent(
      CUSTOM_COMBO_TEST.UPDATED_CRC_TEXT_FRAGMENT
    );
  });
});
