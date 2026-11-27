import type { Database } from "@/app/types";
import type { ReservationDetailMoneyEntry } from "./ReservationDetailMoneyEntry.interface";

export interface ReservationDetailRefundSource
  extends
    ReservationDetailMoneyEntry,
    Pick<
      Database["public"]["Tables"]["refunds"]["Row"],
      "created_at" | "created_by" | "id" | "reason"
    > {}
