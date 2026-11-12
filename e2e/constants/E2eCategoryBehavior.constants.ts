export const E2E_CATEGORY_BEHAVIOR_SCREENSHOT_BASENAME =
  "us-adm-13-category-behavior";

export const E2E_CATEGORY_BEHAVIOR_BASE_NAME =
  "E2E Fixture � Comportamiento";

export const resolveCategoryBehaviorFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_CATEGORY_BEHAVIOR_BASE_NAME} (${projectName} � ${scenario})`;

export const E2E_UNKNOWN_CATEGORY_ID =
  "00000000-0000-4000-8000-000000000000";

export const E2E_MALFORMED_CATEGORY_ID = "not-a-uuid";

export const E2E_BEHAVIOR_DURATION_MINUTES = "90";

export const E2E_NEXT_NOT_FOUND_MESSAGE =
  "This page could not be found.";
