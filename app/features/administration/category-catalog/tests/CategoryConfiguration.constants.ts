import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

export const FAKE_CONFIGURATION_QUANTITY = 8;
export const FAKE_CONFIGURATION_DURATION_MINUTES = 60;
export const FAKE_UNSELECTED_PRESET_DURATION_MINUTES = 30;
export const FAKE_PICKED_PRESET_DURATION_MINUTES = 90;
export const FAKE_OTHER_DURATION_MINUTES = 45;
export const FAKE_CONFIGURATION_DEPOSIT_USD = 50;
export const FAKE_CONFIGURATION_DEPOSIT_CRC = 25000;
export const FAKE_CONFIGURATION_ALERT_QUANTITY = 5;
export const FAKE_CONFIGURATION_ALERT_EXPIRY_DAYS = 30;
export const FAKE_CONFIGURATION_IMAGE_PATH =
  "categories/fake.jpg";

export const DEFAULT_CATEGORY_CONFIGURATION: CategoryConfiguration =
  {
    id: FAKE_CATEGORY_ID,
    name: "Cuadraciclo",
    status: CATEGORY_STATUS.ACTIVE,
    currentQuantity: FAKE_CONFIGURATION_QUANTITY,
    behavior: {
      ...DEFAULT_CATEGORY_BEHAVIOR,
      defaultDurationMinutes:
        FAKE_CONFIGURATION_DURATION_MINUTES,
      guideOnly: false,
    },
    deposit: {
      id: FAKE_CATEGORY_ID,
      depositUsd: null,
      depositCrc: null,
    },
    alerts: {
      id: FAKE_CATEGORY_ID,
      alertMinQuantity: null,
      alertExpiryDays: null,
    },
    image: {
      categoryId: FAKE_CATEGORY_ID,
      categoryName: "Cuadraciclo",
      imagePath: FAKE_CONFIGURATION_IMAGE_PATH,
      imageUrl: null,
    },
  };

export const buildCategoryConfiguration = (
  overrides: Partial<CategoryConfiguration> = {}
): CategoryConfiguration => ({
  ...DEFAULT_CATEGORY_CONFIGURATION,
  ...overrides,
});
