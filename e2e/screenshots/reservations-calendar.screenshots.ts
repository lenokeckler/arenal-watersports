import { CALENDAR_VIEW, PATHS } from "@/app/constants";
import { expect, test } from "../support/activeWorkerTest";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import {
  E2E_RESERVATIONS_CALENDAR_MONTH_SCREENSHOT,
  E2E_RESERVATIONS_CALENDAR_SCREENSHOT,
  E2E_RESERVATIONS_CALENDAR_WEEK_SCREENSHOT,
} from "../constants/E2eReservationsCalendar.constants";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { addReservationsArea } from "../support/addReservationsArea";
import { captureFullPage } from "../support/captureFullPage";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";

test("captures the Reservations calendar", async ({
  activeWorker,
  page,
}, testInfo) => {
  await addReservationsArea(activeWorker.id);
  await submitActiveWorkerSignIn(page, activeWorker);
  await expect(page).toHaveURL(PATHS.MODE);
  const workModePage = createWorkModePage(page);
  await workModePage
    .getCard(E2E_RESERVATIONS_AREA_LABEL)
    .click();
  await expect(page).toHaveURL(PATHS.HOME);

  const calendarPage = createReservationsCalendarPage(page);
  await calendarPage.goTo();
  await expect(calendarPage.getHeading()).toBeVisible();
  await expect(
    calendarPage.getCreateReservationLink()
  ).toHaveCSS("justify-content", "center");
  await expect(
    calendarPage.getCreateReservationLink()
  ).toHaveCSS("width", "56px");
  await expect(
    calendarPage.getCreateReservationLink()
  ).toHaveCSS("height", "56px");
  await expect(
    calendarPage.getCreateReservationLink()
  ).toHaveCSS("border-top-left-radius", "12px");
  if (testInfo.project.use.isMobile !== true) {
    const createReservationLink =
      calendarPage.getCreateReservationLink();
    await createReservationLink.hover();
    await expect(createReservationLink).toHaveCSS(
      "width",
      "192px"
    );
    await page.mouse.move(0, 0);
    await expect(createReservationLink).toHaveCSS(
      "width",
      "56px"
    );
  }
  await captureFullPage(
    page,
    E2E_RESERVATIONS_CALENDAR_SCREENSHOT,
    testInfo.project.name
  );
  await calendarPage.selectView(CALENDAR_VIEW.MONTH);
  await captureFullPage(
    page,
    E2E_RESERVATIONS_CALENDAR_MONTH_SCREENSHOT,
    testInfo.project.name
  );
  await calendarPage.selectView(CALENDAR_VIEW.WEEK);
  await captureFullPage(
    page,
    E2E_RESERVATIONS_CALENDAR_WEEK_SCREENSHOT,
    testInfo.project.name
  );
});
