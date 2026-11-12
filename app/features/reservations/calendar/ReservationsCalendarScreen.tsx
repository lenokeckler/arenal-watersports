import type { ReactElement } from "react";
import { CALENDAR_VIEW } from "@/app/constants";
import { getCalendarToday } from "@/app/components/calendar/utils";
import { ReduxProvider } from "@/app/providers";
import { ReservationsCalendar } from "./ReservationsCalendar";
import { readReservationCalendarSnapshot } from "./readReservationCalendarSnapshot";
import { isExternalGuideRegistrarSignedIn } from "@/app/services/external-guide-registration";

const ReservationsCalendarScreen =
  async (): Promise<ReactElement> => {
    const today = getCalendarToday(new Date());
    const snapshot = await readReservationCalendarSnapshot({
      anchor: today,
      view: CALENDAR_VIEW.DAY,
    });
    const canRegisterExternalGuide =
      await isExternalGuideRegistrarSignedIn();
    return (
      <ReduxProvider>
        <main>
          <ReservationsCalendar
            canRegisterExternalGuide={
              canRegisterExternalGuide
            }
            snapshot={snapshot}
            today={today}
          />
        </main>
      </ReduxProvider>
    );
  };

export default ReservationsCalendarScreen;
