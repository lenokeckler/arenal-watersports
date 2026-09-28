export const E2E_DELETABLE_CATEGORY_BASE_NAME =
  "E2E Fixture — Sin registros";

export const resolveDeletableCategoryName = (
  projectName: string
): string =>
  `${E2E_DELETABLE_CATEGORY_BASE_NAME} (${projectName})`;

export const E2E_CATEGORY_WITH_RECORDS_NAME = "Jet Ski";

export const E2E_CATEGORY_WITH_GROUP_NAME = "Kayak doble";

export const E2E_CATEGORY_GROUP_LABEL = "Kayak";

export const E2E_CATEGORY_WITHOUT_GROUP_NAME = "Chaleco";
