import type { ReservationChargeRecordRow } from "./ReservationChargeRecordRow.interface";

export type ReservationChargeRecordRows = readonly [
  ReservationChargeRecordRow,
  ...ReservationChargeRecordRow[],
];
