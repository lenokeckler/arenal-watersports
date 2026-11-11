import { expect, type Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_OPERATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { createWorkModePage } from "../pages/WorkMode.page";
import { addOperationsArea } from "./addOperationsArea";
import type { ActiveWorker } from "./models/ActiveWorker.interface";

export const switchToOperationsMode = async (
  page: Page,
  activeWorker: ActiveWorker
): Promise<void> => {
  const workMode = createWorkModePage(page);

  await addOperationsArea(activeWorker.id);
  await workMode.goTo();
  await workMode.getCard(E2E_OPERATIONS_AREA_LABEL).click();
  await expect(page).toHaveURL(PATHS.HOME);
};
