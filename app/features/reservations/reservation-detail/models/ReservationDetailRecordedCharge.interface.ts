import type { Database } from "@/app/types";
import type { ReservationDetailMoneyEntry } from "./ReservationDetailMoneyEntry.interface";

export interface ReservationDetailRecordedCharge extends ReservationDetailMoneyEntry {
  kind: Database["public"]["Enums"]["charge_kind"];
}
