import type { Page } from "@playwright/test";
import type { createReservationsCalendarPage } from "../../pages/ReservationsCalendar.page";

export interface ReservationsCalendarCaptureContext {
  calendarPage: ReturnType<
    typeof createReservationsCalendarPage
  >;
  isMobile: boolean;
  page: Page;
  projectName: string;
}
