import type { ChangeEvent, ReactElement } from "react";
import { Label } from "@/app/components";
import { RESERVATION_CALENDAR_LIST } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import { isReservationCalendarPageSize } from "@/app/components/reservation-calendar/utils/isReservationCalendarPageSize";
import { RESERVATION_CALENDAR_AGENDA_PAGINATION_COPY as copy } from "../constants/ReservationCalendarAgendaPaginationCopy.constants";
import type { ReservationCalendarAgendaPageSizeSelectorProps } from "../models/ReservationCalendarAgendaPageSizeSelectorProps.interface";
import {
  RESERVATION_CALENDAR_AGENDA_PAGE_SIZE_LABEL_CLASS,
  RESERVATION_CALENDAR_AGENDA_PAGE_SIZE_SELECT_CLASS,
} from "../styles/ReservationCalendarAgendaPagination.styles";

export const ReservationCalendarAgendaPageSizeSelector = ({
  pagination,
}: ReservationCalendarAgendaPageSizeSelectorProps): ReactElement => {
  const onChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.currentTarget.value);
    if (isReservationCalendarPageSize(pageSize)) {
      void pagination.onPageSizeChange(pageSize);
    }
  };
  return (
    <Label
      className={
        RESERVATION_CALENDAR_AGENDA_PAGE_SIZE_LABEL_CLASS
      }
    >
      {copy.PAGE_SIZE_LABEL}
      <select
        aria-label={copy.PAGE_SIZE_LABEL}
        className={
          RESERVATION_CALENDAR_AGENDA_PAGE_SIZE_SELECT_CLASS
        }
        disabled={pagination.isSavingPageSize}
        onChange={onChange}
        value={pagination.pageSize}
      >
        {RESERVATION_CALENDAR_LIST.PAGE_SIZE_OPTIONS.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}
      </select>
    </Label>
  );
};
