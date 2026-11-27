export const CATEGORY_CONFIGURATION_STEP = {
  ACTIVE: "active",
  PHOTO: "photo",
  SETTINGS: "settings",
} as const;

export type CategoryConfigurationStep =
  (typeof CATEGORY_CONFIGURATION_STEP)[keyof typeof CATEGORY_CONFIGURATION_STEP];
