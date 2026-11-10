export interface ReservationConcreteUnitsQuery {
  categoryId: string;
  endsAt: string;
  excludeReservationId?: string;
  startsAt: string;
}
