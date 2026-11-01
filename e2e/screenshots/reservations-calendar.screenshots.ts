import { PATHS } from "@/app/constants";
import { expect, test } from "../support/activeWorkerTest";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { addReservationsArea } from "../support/addReservationsArea";
import { createReservationsCalendarHeatFixture } from "../support/createReservationsCalendarHeatFixture";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";
import {
  captureCalendarDayAgenda,
  captureCalendarInitialState,
  captureCalendarMonthState,
  captureCalendarWeekState,
  captureCalendarYearState,
} from "./reservationsCalendarCaptureSteps";

test("captures the Reservations calendar states", async ({
  activeWorker,
  page,
}, testInfo) => {
  const heatFixture =
    await createReservationsCalendarHeatFixture(
      activeWorker.id,
      activeWorker.username,
      testInfo.project.name
    );

  try {
    await addReservationsArea(activeWorker.id);
    await submitActiveWorkerSignIn(page, activeWorker);
    await expect(page).toHaveURL(PATHS.MODE);
    const workModePage = createWorkModePage(page);
    await workModePage
      .getCard(E2E_RESERVATIONS_AREA_LABEL)
      .click();
    await expect(page).toHaveURL(PATHS.HOME);

    const calendarPage =
      createReservationsCalendarPage(page);
    await calendarPage.goTo();
    const context = {
      calendarPage,
      isMobile: testInfo.project.use.isMobile === true,
      page,
      projectName: testInfo.project.name,
    };
    await captureCalendarInitialState(context);
    await captureCalendarMonthState(context);
    await captureCalendarDayAgenda(context, heatFixture);
    await captureCalendarYearState(context, heatFixture);
    await captureCalendarWeekState(context);
  } finally {
    await heatFixture.remove();
  }
});
