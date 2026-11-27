import type { ReactElement } from "react";
import type { ReservationCalendarAgendaPaginationViewProps } from "../models/ReservationCalendarAgendaPaginationViewProps.interface";
import { ReservationCalendarAgendaPageSizeSelector } from "./ReservationCalendarAgendaPageSizeSelector";
import { ReservationCalendarAgendaPageNavigation } from "./ReservationCalendarAgendaPageNavigation";
import { ReservationCalendarAgendaPaginationStatus } from "./ReservationCalendarAgendaPaginationStatus";
import { RESERVATION_CALENDAR_AGENDA_PAGINATION_COPY as copy } from "../constants/ReservationCalendarAgendaPaginationCopy.constants";
import { RESERVATION_CALENDAR_AGENDA_PAGINATION_CLASS } from "../styles/ReservationCalendarAgendaPagination.styles";

export const ReservationCalendarAgendaPagination = ({
  onPageChange,
  pageCount,
  pagination,
}: ReservationCalendarAgendaPaginationViewProps): ReactElement => (
  <nav
    aria-label={copy.PAGE_NAVIGATION}
    className={RESERVATION_CALENDAR_AGENDA_PAGINATION_CLASS}
  >
    <ReservationCalendarAgendaPageSizeSelector
      pagination={pagination}
    />
    <ReservationCalendarAgendaPageNavigation
      onPageChange={onPageChange}
      pageCount={pageCount}
      pagination={pagination}
    />
    <ReservationCalendarAgendaPaginationStatus
      pagination={pagination}
    />
  </nav>
);
