import type { ReservationsCalendarViewModel } from "../models/ReservationsCalendarViewModel.interface";
import type { ReservationsCalendarViewModelOptions } from "../models/ReservationsCalendarViewModelOptions.interface";
import { useReservationCalendarPeriodContent } from "./useReservationCalendarPeriodContent";
import { RESERVATION_CALENDAR_LIST } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import { useReservationCalendarAgendaPagination } from "./useReservationCalendarAgendaPagination";
import { updateOwnReservationCalendarPageSize } from "../actions/updateOwnReservationCalendarPageSize";
import { useReservationsCalendarCoreViewModel } from "./useReservationsCalendarCoreViewModel";
import { useReservationCalendarPeriodChangeHandler } from "./useReservationCalendarPeriodChangeHandler";

export const useReservationsCalendarViewModel = ({
  initialPageSize,
  pageSizeReadError = false,
  snapshot,
  today,
}: ReservationsCalendarViewModelOptions): ReservationsCalendarViewModel => {
  const agendaPagination =
    useReservationCalendarAgendaPagination({
      initialPageSize:
        initialPageSize ??
        RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE,
      pageSizeReadError,
      savePageSize: updateOwnReservationCalendarPageSize,
    });
  const core = useReservationsCalendarCoreViewModel(
    snapshot,
    today
  );
  const periodContent = useReservationCalendarPeriodContent(
    core.snapshotState.snapshot ?? undefined,
    core.calendarSelection,
    agendaPagination
  );
  const onPeriodChange =
    useReservationCalendarPeriodChangeHandler(
      core.snapshotState.onPeriodChange,
      agendaPagination.resetPage
    );
  return {
    agendaPagination,
    dayContent: core.dayContent,
    hasRefreshError: core.snapshotState.hasRefreshError,
    isRefreshing: core.snapshotState.isRefreshing,
    onPeriodChange,
    onRetry: core.snapshotState.onRetry,
    periodContent,
    snapshot: core.snapshotState.snapshot,
    selection: core.calendarSelection.selection,
  };
};
