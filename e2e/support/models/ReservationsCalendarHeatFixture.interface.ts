import type { ReservationsCalendarHeatDay } from "./ReservationsCalendarHeatDay.interface";

export interface ReservationsCalendarHeatFixture {
  dates: readonly ReservationsCalendarHeatDay[];
  remove: () => Promise<void>;
}
