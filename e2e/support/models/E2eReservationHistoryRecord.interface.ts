export interface E2eReservationHistoryRecord {
  customerName: string;
  id: string;
  remove: () => Promise<void>;
}
