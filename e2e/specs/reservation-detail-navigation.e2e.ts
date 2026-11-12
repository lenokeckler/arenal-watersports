import { PATHS } from "@/app/constants";
import { expect, test } from "../support/activeWorkerTest";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createReservationsCalendarDetailNavigationPage } from "../pages/ReservationsCalendarDetailNavigation.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { addReservationsArea } from "../support/addReservationsArea";
import { createReservationsCalendarHeatFixture } from "../support/createReservationsCalendarHeatFixture";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";
import { exerciseReservationCalendarDetailNavigation } from "../support/reservationCalendarDetailNavigation";

test("opens reservation details from month, day, and week with the keyboard", async ({
  activeWorker,
  page,
}, testInfo) => {
  const fixture =
    await createReservationsCalendarHeatFixture(
      activeWorker.id,
      activeWorker.username,
      testInfo.project.name
    );
  try {
    await addReservationsArea(activeWorker.id);
    await submitActiveWorkerSignIn(page, activeWorker);
    await expect(page).toHaveURL(PATHS.MODE);
    await createWorkModePage(page)
      .getCard(E2E_RESERVATIONS_AREA_LABEL)
      .click();
    const calendarPage = {
      ...createReservationsCalendarPage(page),
      ...createReservationsCalendarDetailNavigationPage(
        page
      ),
    };
    await exerciseReservationCalendarDetailNavigation(
      page,
      calendarPage,
      fixture
    );
  } finally {
    await fixture.remove();
  }
});
