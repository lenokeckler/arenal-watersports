"use client";

import type { ReservationsCalendarRouteErrorProps } from "@/app/features/reservations/calendar/models/ReservationsCalendarRouteErrorProps.interface";
import ReservationsCalendarRouteError from "@/app/features/reservations/calendar/ReservationsCalendarRouteError";

const ReservationsCalendarError = (
  props: ReservationsCalendarRouteErrorProps
): React.JSX.Element => (
  <ReservationsCalendarRouteError {...props} />
);

export default ReservationsCalendarError;
