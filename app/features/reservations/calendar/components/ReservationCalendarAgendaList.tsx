import type { ReactElement } from "react";
import { RESERVATIONS_CALENDAR_COPY } from "@/app/constants";
import type { ReservationCalendarAgendaListProps } from "../models/ReservationCalendarAgendaListProps.interface";
import { ReservationCalendarAgenda } from "./ReservationCalendarAgenda";
import { ReservationCalendarAgendaPagination } from "./ReservationCalendarAgendaPagination";

export const ReservationCalendarAgendaList = ({
  periodAgenda,
  periodPage,
  pagination,
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
      <>
        <ReservationCalendarAgenda
          agenda={periodAgenda}
          label={RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA}
          showGroups={showPeriodAgenda}
        />
        {showPeriodAgenda && periodPage.totalCount > 0 && (
          <ReservationCalendarAgendaPagination
            onPageChange={pagination.onPageChange}
            pageCount={periodPage.pageCount}
            pagination={{
              ...pagination,
              page: periodPage.page,
            }}
          />
        )}
      </>
    )}
  </>
);
