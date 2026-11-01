import { PATHS, THEME } from "@/app/constants";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import {
  E2E_LIGHT_THEME_SCREENSHOT,
  E2E_LIGHT_THEME_SCREENSHOT_EXTENSION,
  E2E_LIGHT_THEME_STORAGE,
} from "../constants/E2eLightTheme.constants";
import { createLightThemePage } from "../pages/LightTheme.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { captureViewport } from "../support/captureViewport";
import { addReservationsArea } from "../support/addReservationsArea";
import { waitForCalendarPeriod } from "../support/reservationsCalendarAssertions";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";
import { expect, test } from "../support/activeWorkerTest";

test("captures the Reservations calendar in dark and light themes", async ({
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
  await waitForCalendarPeriod(page, calendarPage);

  const themePage = createLightThemePage(page);
  await captureViewport(
    page,
    `${E2E_LIGHT_THEME_SCREENSHOT.DARK}-${testInfo.project.name}${E2E_LIGHT_THEME_SCREENSHOT_EXTENSION}`
  );

  await themePage.clickToggleForTheme(THEME.LIGHT);
  await expect(themePage.getRoot()).toHaveAttribute(
    E2E_LIGHT_THEME_STORAGE.ATTRIBUTE,
    THEME.LIGHT
  );
  await waitForCalendarPeriod(page, calendarPage);
  await captureViewport(
    page,
    `${E2E_LIGHT_THEME_SCREENSHOT.LIGHT}-${testInfo.project.name}${E2E_LIGHT_THEME_SCREENSHOT_EXTENSION}`
  );

  await createSessionBarPage(page).signOut();
  await expect(page).toHaveURL(PATHS.ACCESS.LOGIN);
});
