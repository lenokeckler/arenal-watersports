import type { ReactElement } from "react";
import { RESERVATIONS_CALENDAR_COPY } from "@/app/constants";
import type { ReservationCalendarAgendaContent } from "../models/ReservationCalendarAgendaContent.interface";
import { ReservationCalendarAgenda } from "./ReservationCalendarAgenda";

interface ReservationCalendarAgendaListProps {
  periodAgenda: ReservationCalendarAgendaContent;
  selectedDayAgenda?: ReservationCalendarAgendaContent;
  selectedMonthAgenda?: ReservationCalendarAgendaContent;
  showPeriodAgenda: boolean;
  showPeriodStatus: boolean;
}

export const ReservationCalendarAgendaList = ({
  periodAgenda,
  selectedDayAgenda,
  selectedMonthAgenda,
  showPeriodAgenda,
  showPeriodStatus,
}: ReservationCalendarAgendaListProps): ReactElement => (
  <>
    {selectedDayAgenda !== undefined && (
      <ReservationCalendarAgenda
        agenda={selectedDayAgenda}
        label={
          RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA
        }
        showGroups
      />
    )}
    {selectedMonthAgenda !== undefined && (
      <ReservationCalendarAgenda
        agenda={selectedMonthAgenda}
        label={
          RESERVATIONS_CALENDAR_COPY.SELECTED_MONTH_AGENDA
        }
        showGroups
      />
    )}
    {showPeriodStatus && (
      <ReservationCalendarAgenda
        agenda={periodAgenda}
        label={RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA}
        showGroups={showPeriodAgenda}
      />
    )}
  </>
);
