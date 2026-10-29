import { describe, expect, it } from "vitest";
import {
  PREDEFINED_COMBO_AUDIENCE,
  PREDEFINED_COMBO_CURRENCY,
  PREDEFINED_COMBO_INTERCHANGEABILITY,
  PREDEFINED_COMBO_STATUS,
} from "../constants/PredefinedCombo.constants";
import { mapPredefinedComboRecords } from "../utils/mapPredefinedComboRecords";
import {
  DEFAULT_PREDEFINED_COMBO_RECORDS,
  PREDEFINED_COMBO_TEST_IDS,
} from "./predefinedCombo.constants";

describe("mapPredefinedComboRecords", () => {
  it("maps active combos to their audience package price and active components", () => {
    expect(
      mapPredefinedComboRecords(
        DEFAULT_PREDEFINED_COMBO_RECORDS
      )
    ).toEqual([
      {
        audience: PREDEFINED_COMBO_AUDIENCE.NATIONAL,
        currency: PREDEFINED_COMBO_CURRENCY.CRC,
        id: PREDEFINED_COMBO_TEST_IDS.COMBO,
        items: [
          {
            categoryId: PREDEFINED_COMBO_TEST_IDS.CATEGORY,
            categoryName: "Jet Ski",
            quantity: 2,
          },
        ],
        name: "Adventure",
        packagePrice: 25000,
      },
      {
        audience: PREDEFINED_COMBO_AUDIENCE.FOREIGN,
        currency: PREDEFINED_COMBO_CURRENCY.USD,
        id: PREDEFINED_COMBO_TEST_IDS.FOREIGN_COMBO,
        items: [
          {
            categoryId: PREDEFINED_COMBO_TEST_IDS.CATEGORY,
            categoryName: "Jet Ski",
            quantity: 1,
          },
        ],
        name: "Foreign Adventure",
        packagePrice: 75,
      },
    ]);
  });

  it("omits inactive combos, missing components, and invalid audience prices", () => {
    const invalidRecords = {
      ...DEFAULT_PREDEFINED_COMBO_RECORDS,
      combos: [
        ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos,
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos[0],
          id: PREDEFINED_COMBO_TEST_IDS.INACTIVE_COMBO,
          status: PREDEFINED_COMBO_STATUS.INACTIVE,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos[0],
          id: PREDEFINED_COMBO_TEST_IDS.INVALID_PRICE_COMBO,
          package_price_crc: null,
          package_price_usd: 100,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos[0],
          id: PREDEFINED_COMBO_TEST_IDS.EMPTY_COMBO,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos[0],
          id: PREDEFINED_COMBO_TEST_IDS.INVALID_CATEGORY_COMBO,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos[0],
          id: PREDEFINED_COMBO_TEST_IDS.INVALID_QUANTITY_COMBO,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos[0],
          id: PREDEFINED_COMBO_TEST_IDS.NON_RESERVABLE_COMBO,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos[0],
          id: PREDEFINED_COMBO_TEST_IDS.NON_INTERCHANGEABLE_COMBO,
        },
      ],
      categories: [
        ...DEFAULT_PREDEFINED_COMBO_RECORDS.categories,
        {
          id: PREDEFINED_COMBO_TEST_IDS.INACTIVE_CATEGORY,
          is_reservable: true,
          name: "Inactive category",
          status: PREDEFINED_COMBO_STATUS.INACTIVE,
          units_are_interchangeable:
            PREDEFINED_COMBO_INTERCHANGEABILITY.INTERCHANGEABLE,
        },
        {
          id: PREDEFINED_COMBO_TEST_IDS.NON_RESERVABLE_CATEGORY,
          is_reservable: false,
          name: "Non reservable category",
          status: PREDEFINED_COMBO_STATUS.ACTIVE,
          units_are_interchangeable:
            PREDEFINED_COMBO_INTERCHANGEABILITY.INTERCHANGEABLE,
        },
        {
          id: PREDEFINED_COMBO_TEST_IDS.NON_INTERCHANGEABLE_CATEGORY,
          is_reservable: true,
          name: "Lancha",
          status: PREDEFINED_COMBO_STATUS.ACTIVE,
          units_are_interchangeable:
            PREDEFINED_COMBO_INTERCHANGEABILITY.NOT_INTERCHANGEABLE,
        },
      ],
      comboItems: [
        ...DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems,
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems[0],
          combo_id:
            PREDEFINED_COMBO_TEST_IDS.INVALID_CATEGORY_COMBO,
          category_id:
            PREDEFINED_COMBO_TEST_IDS.INACTIVE_CATEGORY,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems[0],
          combo_id:
            PREDEFINED_COMBO_TEST_IDS.INVALID_QUANTITY_COMBO,
          quantity: 0,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems[0],
          combo_id:
            PREDEFINED_COMBO_TEST_IDS.NON_RESERVABLE_COMBO,
          category_id:
            PREDEFINED_COMBO_TEST_IDS.NON_RESERVABLE_CATEGORY,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems[0],
          combo_id:
            PREDEFINED_COMBO_TEST_IDS.NON_INTERCHANGEABLE_COMBO,
          category_id:
            PREDEFINED_COMBO_TEST_IDS.NON_INTERCHANGEABLE_CATEGORY,
        },
      ],
    };

    expect(
      mapPredefinedComboRecords(invalidRecords)
    ).toEqual(
      mapPredefinedComboRecords(
        DEFAULT_PREDEFINED_COMBO_RECORDS
      )
    );
  });

  it("omits packages with zero or negative audience prices", () => {
    const recordsWithInvalidPackagePrices = {
      ...DEFAULT_PREDEFINED_COMBO_RECORDS,
      combos: [
        ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos,
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos[0],
          id: PREDEFINED_COMBO_TEST_IDS.ZERO_PRICE_COMBO,
          package_price_crc: 0,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.combos[0],
          id: PREDEFINED_COMBO_TEST_IDS.NEGATIVE_PRICE_COMBO,
          package_price_crc: -1,
        },
      ],
      comboItems: [
        ...DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems,
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems[0],
          combo_id:
            PREDEFINED_COMBO_TEST_IDS.ZERO_PRICE_COMBO,
        },
        {
          ...DEFAULT_PREDEFINED_COMBO_RECORDS.comboItems[0],
          combo_id:
            PREDEFINED_COMBO_TEST_IDS.NEGATIVE_PRICE_COMBO,
        },
      ],
    };

    expect(
      mapPredefinedComboRecords(
        recordsWithInvalidPackagePrices
      )
    ).toEqual(
      mapPredefinedComboRecords(
        DEFAULT_PREDEFINED_COMBO_RECORDS
      )
    );
  });
});
