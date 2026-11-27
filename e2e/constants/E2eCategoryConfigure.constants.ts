export const E2E_CATEGORY_CONFIGURE_BASE_NAME =
  "E2E Fixture - Configurar";

export const resolveCategoryConfigureFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_CATEGORY_CONFIGURE_BASE_NAME} (${projectName} - ${scenario})`;
