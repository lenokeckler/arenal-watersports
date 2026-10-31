import type { ReactElement } from "react";
import { CALENDAR_VIEW } from "@/app/constants";
import { getCalendarToday } from "@/app/components/calendar/utils";
import { ReduxProvider } from "@/app/providers";
import { ReservationsCalendar } from "./ReservationsCalendar";
import { readReservationCalendarSnapshot } from "./readReservationCalendarSnapshot";

const ReservationsCalendarScreen =
  async (): Promise<ReactElement> => {
    const today = getCalendarToday(new Date());
    const snapshot = await readReservationCalendarSnapshot({
      anchor: today,
      view: CALENDAR_VIEW.DAY,
    });
    return (
      <ReduxProvider>
        <main>
          <ReservationsCalendar
            snapshot={snapshot}
            today={today}
          />
        </main>
      </ReduxProvider>
    );
  };

export default ReservationsCalendarScreen;
