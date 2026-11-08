import type { Page } from "@playwright/test";
import type { ReservationsCalendarDetailNavigationPage } from "../../support/models/ReservationsCalendarDetailNavigationPage.type";

export interface ReservationsCalendarCaptureContext {
  calendarPage: ReservationsCalendarDetailNavigationPage;
  isMobile: boolean;
  page: Page;
  projectName: string;
}
