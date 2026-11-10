import { PATHS } from "@/app/constants";
import {
  E2E_OPERATIONS_AREA_LABEL,
  E2E_RESERVATIONS_AREA_LABEL,
} from "../constants/E2eWorkMode.constants";
import { E2E_SYSTEM_NAVIGATION_MODES } from "../constants/E2eSystemNavigation.constants";
import { createSystemNavigationPage } from "../pages/SystemNavigation.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addOperationsArea } from "../support/addOperationsArea";
import { addReservationsArea } from "../support/addReservationsArea";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("captures bottom navigation in both work modes", async ({
  activeWorker,
  page,
}) => {
  await addOperationsArea(activeWorker.id);
  await addReservationsArea(activeWorker.id);
  await submitActiveWorkerSignIn(page, activeWorker);
  await expect(page).toHaveURL(PATHS.MODE);

  const workModePage = createWorkModePage(page);
  await workModePage
    .getCard(E2E_OPERATIONS_AREA_LABEL)
    .click();
  const navigationPage = createSystemNavigationPage(page);
  await navigationPage.goTo();
  await expect(
    navigationPage.getNavigation()
  ).toBeVisible();
  await navigationPage.capture(
    E2E_SYSTEM_NAVIGATION_MODES.OPERATIONS
  );

  await page.goto(PATHS.MODE);
  await workModePage
    .getCard(E2E_RESERVATIONS_AREA_LABEL)
    .click();
  await navigationPage.goTo();
  await expect(
    navigationPage.getNavigation()
  ).toBeVisible();
  await navigationPage.capture(
    E2E_SYSTEM_NAVIGATION_MODES.RESERVATIONS
  );
});

test("captures Administration bottom navigation", async ({
  page,
}) => {
  const navigationPage = createSystemNavigationPage(page);
  await signInAsSeededWorker(page);
  await navigationPage.goTo();
  await expect(
    navigationPage.getNavigation()
  ).toBeVisible();
  await navigationPage.capture(
    E2E_SYSTEM_NAVIGATION_MODES.ADMINISTRATION
  );
});
