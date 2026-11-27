export const CATEGORY_CONFIGURE_SAVE_STATUS = {
  FAILED: "failed",
  IDLE: "idle",
  SAVED: "saved",
  SAVING: "saving",
} as const;

export type CategoryConfigureSaveStatus =
  (typeof CATEGORY_CONFIGURE_SAVE_STATUS)[keyof typeof CATEGORY_CONFIGURE_SAVE_STATUS];
