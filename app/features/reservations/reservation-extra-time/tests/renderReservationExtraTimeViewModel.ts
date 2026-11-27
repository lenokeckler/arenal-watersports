import { renderHook } from "@testing-library/react";
import { useReservationExtraTimeViewModel } from "../hooks/useReservationExtraTimeViewModel";
import { EXTRA_TIME_RESERVATION_ID } from "./ReservationExtraTime.constants";

export const renderViewModel = () =>
  renderHook(() =>
    useReservationExtraTimeViewModel(
      EXTRA_TIME_RESERVATION_ID
    )
  );
