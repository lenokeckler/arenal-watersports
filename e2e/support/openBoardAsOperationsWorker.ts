import { expect, type Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_OPERATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { createBoardPage } from "../pages/Board.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { addOperationsArea } from "./addOperationsArea";
import { addReservationsArea } from "./addReservationsArea";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { submitActiveWorkerSignIn } from "./submitActiveWorkerSignIn";

export const openBoardAsOperationsWorker = async (
  page: Page,
  activeWorker: ActiveWorker
): Promise<void> => {
  await addOperationsArea(activeWorker.id);
  await addReservationsArea(activeWorker.id);
  await submitActiveWorkerSignIn(page, activeWorker);
  await expect(page).toHaveURL(PATHS.MODE);
  await createWorkModePage(page)
    .getCard(E2E_OPERATIONS_AREA_LABEL)
    .click();

  const boardPage = createBoardPage(page);

  await boardPage.goTo();
  await expect(boardPage.getGrid()).toBeVisible();
};
