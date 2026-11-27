export const E2E_CATEGORY_CONFIGURE_BASE_NAME =
  "E2E Fixture - Configurar";

export const E2E_PICKED_DURATION_MINUTES = 90;
export const E2E_NEW_CATEGORY_DURATION_MINUTES = 60;
export const E2E_STOCK_QUANTITY = 3;
export const E2E_RESERVABLE_REQUIRED_STEPS = 3;
export const E2E_INTERNAL_REQUIRED_STEPS = 1;
export const E2E_NO_STEPS_DONE = 0;
export const E2E_STOCK_STEP_DONE_COUNT = 2;
export const E2E_DURATION_STEP_DONE_COUNT = 1;
export const E2E_UNSAVED_CHANGE_COUNT = 3;
export const E2E_DEPOSIT_USD_TEXT = "50";
export const E2E_ALERT_QUANTITY_TEXT = "5";
export const E2E_ALERT_EXPIRY_DAYS_TEXT = "7";

export const resolveCategoryConfigureFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_CATEGORY_CONFIGURE_BASE_NAME} (${projectName} - ${scenario})`;
