import type { ReactElement } from "react";
import { CALENDAR_VIEW } from "@/app/constants";
import { getCalendarToday } from "@/app/components/calendar/utils";
import { ReduxProvider } from "@/app/providers";
import { ReservationsCalendar } from "./ReservationsCalendar";
import { readReservationCalendarSnapshot } from "./readReservationCalendarSnapshot";
import { isExternalGuideRegistrarSignedIn } from "@/app/services/external-guide-registration";
import { readReservationCalendarPageSizePreference } from "./services/readReservationCalendarPageSizePreference";

const ReservationsCalendarScreen =
  async (): Promise<ReactElement> => {
    const today = getCalendarToday(new Date());
    const [
      snapshot,
      pageSizePreference,
      canRegisterExternalGuide,
    ] = await Promise.all([
      readReservationCalendarSnapshot({
        anchor: today,
        view: CALENDAR_VIEW.DAY,
      }),
      readReservationCalendarPageSizePreference(),
      isExternalGuideRegistrarSignedIn(),
    ]);
    return (
      <ReduxProvider>
        <main>
          <ReservationsCalendar
            canRegisterExternalGuide={
              canRegisterExternalGuide
            }
            initialPageSize={pageSizePreference.pageSize}
            pageSizeReadError={pageSizePreference.hasError}
            snapshot={snapshot}
            today={today}
          />
        </main>
      </ReduxProvider>
    );
  };

export default ReservationsCalendarScreen;
