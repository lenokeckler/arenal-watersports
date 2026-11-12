import { randomUUID } from "node:crypto";
import { E2E_PREDEFINED_COMBO_FIXTURE } from "../constants/E2ePredefinedCombo.constants";
import type { PredefinedComboFixtureResources } from "../models/PredefinedComboFixtureResources.interface";

export const createPredefinedComboFixtureResources = (
  fixtureLabel: string
): PredefinedComboFixtureResources => {
  const fixtureId = randomUUID();
  const displayToken = fixtureId
    .replaceAll("-", "")
    .slice(0, 6);
  const workerToken = fixtureId
    .replaceAll("-", "")
    .slice(
      0,
      E2E_PREDEFINED_COMBO_FIXTURE.WORKER_TOKEN_LENGTH
    );
  return {
    categoryId: randomUUID(),
    categoryName: `${E2E_PREDEFINED_COMBO_FIXTURE.CATEGORY_NAME_PREFIX} ${displayToken}`,
    comboId: randomUUID(),
    comboName: `${E2E_PREDEFINED_COMBO_FIXTURE.COMBO_NAME_PREFIX} ${displayToken}`,
    customerName: `${E2E_PREDEFINED_COMBO_FIXTURE.CUSTOMER_PREFIX} ${fixtureLabel} ${displayToken}`,
    workerAuthCreated: false,
    workerEmail: `${E2E_PREDEFINED_COMBO_FIXTURE.WORKER_USERNAME_PREFIX}${workerToken}@${E2E_PREDEFINED_COMBO_FIXTURE.WORKER_EMAIL_DOMAIN}`,
    workerId: randomUUID(),
    workerPassword: `${E2E_PREDEFINED_COMBO_FIXTURE.WORKER_PASSWORD_PREFIX}${randomUUID()}`,
    workerUsername: `${E2E_PREDEFINED_COMBO_FIXTURE.WORKER_USERNAME_PREFIX}${workerToken}`,
  };
};
