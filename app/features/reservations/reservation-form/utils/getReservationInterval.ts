import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import type { ReservationInterval } from "../models/ReservationInterval.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";

export const getReservationInterval = (
  input: ReservationUnitAvailabilityInput
): ReservationInterval => {
  const startsAt = new Date(
    `${input.date}T${input.time}:00${RESERVATION_AVAILABILITY.COSTA_RICA_OFFSET}`
  );
  const endsAt = new Date(
    startsAt.getTime() +
      input.durationMinutes *
        RESERVATION_AVAILABILITY.MILLISECONDS_PER_MINUTE
  );

  return {
    endsAt: endsAt.toISOString(),
    startsAt: startsAt.toISOString(),
  };
};
