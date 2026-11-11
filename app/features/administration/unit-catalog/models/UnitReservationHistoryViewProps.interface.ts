import type { NullableUndefined } from "@/app/types";
import type { UnitReservationItem } from "./UnitReservationItem.interface";

export interface UnitReservationHistoryViewProps {
  basePath: string;
  currentPage: number;
  fetchError?: NullableUndefined<Error>;
  fetchFailed: boolean;
  pageCount: number;
  reservations: UnitReservationItem[];
}
