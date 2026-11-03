"use client";

import ReservationDetailError from "@/app/features/reservations/reservation-detail/ReservationDetailError";
import type { ReservationDetailErrorProps } from "@/app/features/reservations/reservation-detail/models/ReservationDetailErrorProps.interface";

const ReservationDetailRouteError = (
  props: ReservationDetailErrorProps
): React.JSX.Element => (
  <ReservationDetailError {...props} />
);

export default ReservationDetailRouteError;
