import type { ReactElement } from "react";
import type { NullableRef } from "@/app/types";
import {
  CALENDAR_VIEW,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { ReservationCalendarGroupsProps } from "../models/ReservationCalendarGroupsProps.interface";
import { ReservationCalendarAgenda } from "./ReservationCalendarAgenda";
import { RESERVATION_CALENDAR_AGENDAS_CLASS } from "../styles/ReservationCalendarGroups.styles";

export const ReservationCalendarGroups = ({
  period,
  periodAgenda,
  selectedDayAgenda,
  selectedMonthAgenda,
}: ReservationCalendarGroupsProps): NullableRef<ReactElement> => {
  const showPeriodAgenda =
    period.view === CALENDAR_VIEW.MONTH ||
    period.view === CALENDAR_VIEW.YEAR;
  const showPeriodStatus =
    showPeriodAgenda || periodAgenda.messages.length > 0;
  if (
    !showPeriodStatus &&
    selectedDayAgenda === undefined &&
    selectedMonthAgenda === undefined
  ) {
    return null;
  }
  return (
    <div className={RESERVATION_CALENDAR_AGENDAS_CLASS}>
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
    </div>
  );
};
