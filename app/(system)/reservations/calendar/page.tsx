import type { Metadata } from "next";
import { RESERVATIONS_CALENDAR_COPY } from "@/app/constants";
import ReservationsCalendarScreen from "@/app/features/reservations/calendar/ReservationsCalendarScreen";

export const metadata: Metadata = {
  title: RESERVATIONS_CALENDAR_COPY.TITLE,
};

const ReservationsCalendarPage = (): React.JSX.Element => (
  <ReservationsCalendarScreen />
);

export default ReservationsCalendarPage;
