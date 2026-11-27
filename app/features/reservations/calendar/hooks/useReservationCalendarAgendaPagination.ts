import { useCallback, useState } from "react";
import { RESERVATION_CALENDAR_LIST } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";
import type { ReservationCalendarAgendaPagination } from "../models/ReservationCalendarAgendaPagination.interface";
import type { ReservationCalendarAgendaPaginationOptions } from "../models/ReservationCalendarAgendaPaginationOptions.interface";

export const useReservationCalendarAgendaPagination = ({
  initialPageSize,
  pageSizeReadError,
  savePageSize,
}: ReservationCalendarAgendaPaginationOptions): ReservationCalendarAgendaPagination => {
  const [page, setPage] = useState<number>(
    RESERVATION_CALENDAR_LIST.FIRST_PAGE
  );
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [isSavingPageSize, setIsSavingPageSize] =
    useState(false);
  const [saveError, setSaveError] = useState(false);
  const onPageChange = useCallback(
    (nextPage: number): void => {
      setPage(
        Math.max(
          RESERVATION_CALENDAR_LIST.FIRST_PAGE,
          nextPage
        )
      );
    },
    []
  );
  const resetPage = useCallback(
    () => setPage(RESERVATION_CALENDAR_LIST.FIRST_PAGE),
    []
  );
  const onPageSizeChange = useCallback(
    async (
      nextPageSize: ReservationCalendarPageSize
    ): Promise<void> => {
      if (isSavingPageSize || nextPageSize === pageSize) {
        return;
      }
      setIsSavingPageSize(true);
      setSaveError(false);
      try {
        const result = await savePageSize(nextPageSize);
        if (result.kind === "saved") {
          setPageSize(result.pageSize);
          resetPage();
        } else {
          setSaveError(true);
        }
      } catch {
        setSaveError(true);
      } finally {
        setIsSavingPageSize(false);
      }
    },
    [isSavingPageSize, pageSize, resetPage, savePageSize]
  );
  return {
    isSavingPageSize,
    onPageChange,
    onPageSizeChange,
    page,
    pageSize,
    pageSizeReadError,
    resetPage,
    saveError,
  };
};
