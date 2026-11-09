import { createReservationsCalendarDetailNavigationPage } from "../../pages/ReservationsCalendarDetailNavigation.page";
import type { ReservationsCalendarPage } from "./ReservationsCalendarPage.type";

export type ReservationsCalendarDetailNavigationPage =
  ReservationsCalendarPage &
    ReturnType<
      typeof createReservationsCalendarDetailNavigationPage
    >;
