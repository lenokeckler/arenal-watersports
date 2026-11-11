import type { ReactElement } from "react";
import { CALENDAR_VIEW } from "@/app/constants";
import { getCalendarToday } from "@/app/components/calendar/utils";
import { ReduxProvider } from "@/app/providers";
import { readOperationsCalendarSnapshot } from "@/app/services/reservations/readOperationsCalendarSnapshot";
import { OperationsCalendarConnected } from "./OperationsCalendarConnected";

const OperationsCalendarScreen =
  async (): Promise<ReactElement> => {
    const today = getCalendarToday(new Date());
    const initialSnapshot =
      await readOperationsCalendarSnapshot({
        anchor: today,
        view: CALENDAR_VIEW.DAY,
      });
    return (
      <ReduxProvider>
        <main>
          <OperationsCalendarConnected
            initialSnapshot={initialSnapshot}
            today={today}
          />
        </main>
      </ReduxProvider>
    );
  };

export default OperationsCalendarScreen;
