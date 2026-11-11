import type { ReactElement } from "react";
import type { NullableRef } from "@/app/types";
import { CALENDAR_VIEW } from "@/app/constants";
import type { ReservationCalendarGroupsProps } from "../models/ReservationCalendarGroupsProps.interface";
import { RESERVATION_CALENDAR_AGENDAS_CLASS } from "../styles/ReservationCalendarGroups.styles";
import { ReservationCalendarAgendaList } from "./ReservationCalendarAgendaList";

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
      <ReservationCalendarAgendaList
        periodAgenda={periodAgenda}
        selectedDayAgenda={selectedDayAgenda}
        selectedMonthAgenda={selectedMonthAgenda}
        showPeriodAgenda={showPeriodAgenda}
        showPeriodStatus={showPeriodStatus}
      />
    </div>
  );
};
