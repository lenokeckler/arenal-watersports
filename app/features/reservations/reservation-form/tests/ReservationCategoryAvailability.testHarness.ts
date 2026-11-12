import { renderHook } from "@testing-library/react";
import { useReservationCategoryAvailability } from "../hooks/useReservationCategoryAvailability";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";

export const renderReservationCategoryAvailabilityHook = (
  request: ReservationUnitAvailabilityInput
) =>
  renderHook(
    ({ request: selectedRequest }) =>
      useReservationCategoryAvailability(
        selectedRequest,
        0
      ),
    { initialProps: { request } }
  );
