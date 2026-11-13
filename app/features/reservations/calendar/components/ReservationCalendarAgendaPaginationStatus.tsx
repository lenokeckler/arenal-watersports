import type { ReactElement } from "react";
import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CALENDAR_AGENDA_PAGINATION_COPY as copy } from "../constants/ReservationCalendarAgendaPaginationCopy.constants";
import type { ReservationCalendarAgendaPaginationStatusProps } from "../models/ReservationCalendarAgendaPaginationStatusProps.interface";
import { RESERVATION_CALENDAR_AGENDA_STATUS_CLASS } from "../styles/ReservationCalendarAgendaPagination.styles";

export const ReservationCalendarAgendaPaginationStatus = ({
  pagination,
}: ReservationCalendarAgendaPaginationStatusProps): ReactElement => (
  <>
    {pagination.saveError && (
      <Text role={ARIA_ROLE.ALERT}>{copy.SAVE_ERROR}</Text>
    )}
    {pagination.pageSizeReadError && (
      <Text
        className={RESERVATION_CALENDAR_AGENDA_STATUS_CLASS}
        role={ARIA_ROLE.STATUS}
      >
        {copy.PAGE_SIZE_READ_WARNING}
      </Text>
    )}
  </>
);
