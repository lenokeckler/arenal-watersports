import type { ReactElement } from "react";
import { Button } from "@/app/components";
import { BUTTON, SIZE } from "@/app/constants";
import { RESERVATION_CALENDAR_LIST } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import { RESERVATION_CALENDAR_AGENDA_PAGINATION_COPY as copy } from "../constants/ReservationCalendarAgendaPaginationCopy.constants";
import type { ReservationCalendarAgendaPaginationViewProps } from "../models/ReservationCalendarAgendaPaginationViewProps.interface";
import { RESERVATION_CALENDAR_AGENDA_PAGE_BUTTON_CLASS } from "../styles/ReservationCalendarAgendaPagination.styles";

export const ReservationCalendarAgendaPageNavigation = ({
  onPageChange,
  pageCount,
  pagination,
}: ReservationCalendarAgendaPaginationViewProps): ReactElement => (
  <>
    <Button
      className={
        RESERVATION_CALENDAR_AGENDA_PAGE_BUTTON_CLASS
      }
      disabled={
        pagination.page <=
          RESERVATION_CALENDAR_LIST.FIRST_PAGE ||
        pagination.isSavingPageSize
      }
      onClick={() =>
        onPageChange(
          pagination.page -
            RESERVATION_CALENDAR_LIST.PAGE_INCREMENT
        )
      }
      size={SIZE.SM}
      variant={BUTTON.BASE}
    >
      {copy.PREVIOUS}
    </Button>
    <Button
      className={
        RESERVATION_CALENDAR_AGENDA_PAGE_BUTTON_CLASS
      }
      disabled={
        pagination.page >= pageCount ||
        pagination.isSavingPageSize
      }
      onClick={() =>
        onPageChange(
          pagination.page +
            RESERVATION_CALENDAR_LIST.PAGE_INCREMENT
        )
      }
      size={SIZE.SM}
      variant={BUTTON.BASE}
    >
      {copy.NEXT}
    </Button>
  </>
);
