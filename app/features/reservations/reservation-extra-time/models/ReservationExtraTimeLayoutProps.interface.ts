import type { ReservationExtraTime } from "./ReservationExtraTime.interface";

export interface ReservationExtraTimeLayoutProps {
  children: React.ReactNode;
  extraTime: Pick<
    ReservationExtraTime,
    "code" | "customerName" | "id"
  >;
}
