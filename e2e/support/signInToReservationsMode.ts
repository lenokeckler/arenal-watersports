import type { Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { createWorkModePage } from "../pages/WorkMode.page";
import { addReservationsArea } from "./addReservationsArea";
import type { ActiveWorker } from "./models/ActiveWorker.interface";
import { submitActiveWorkerSignIn } from "./submitActiveWorkerSignIn";

export const signInToReservationsMode = async (
  page: Page,
  activeWorker: ActiveWorker
): Promise<void> => {
  await addReservationsArea(activeWorker.id);
  await submitActiveWorkerSignIn(page, activeWorker);
  await page.waitForURL(PATHS.MODE);
  await createWorkModePage(page)
    .getCard(E2E_RESERVATIONS_AREA_LABEL)
    .click();
  await page.waitForURL(PATHS.HOME);
};
