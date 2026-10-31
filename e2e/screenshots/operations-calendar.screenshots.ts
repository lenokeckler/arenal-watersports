import { PATHS } from "@/app/constants";
import { E2E_OPERATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { E2E_OPERATIONS_CALENDAR_SCREENSHOT } from "../constants/E2eOperationsCalendar.constants";
import { createOperationsCalendarPage } from "../pages/OperationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { expect, test } from "../support/activeWorkerTest";
import { addOperationsArea } from "../support/addOperationsArea";
import { addReservationsArea } from "../support/addReservationsArea";
import { captureFullPage } from "../support/captureFullPage";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";

test("captures the Operations calendar", async ({
  activeWorker,
  page,
}, testInfo) => {
  await addOperationsArea(activeWorker.id);
  await addReservationsArea(activeWorker.id);
  await submitActiveWorkerSignIn(page, activeWorker);
  await expect(page).toHaveURL(PATHS.MODE);
  const workModePage = createWorkModePage(page);
  await workModePage
    .getCard(E2E_OPERATIONS_AREA_LABEL)
    .click();
  await expect(page).toHaveURL(PATHS.HOME);

  const calendarPage = createOperationsCalendarPage(page);
  await calendarPage.goTo();
  await expect(calendarPage.getHeading()).toBeVisible();
  await captureFullPage(
    page,
    E2E_OPERATIONS_CALENDAR_SCREENSHOT,
    testInfo.project.name
  );
});
