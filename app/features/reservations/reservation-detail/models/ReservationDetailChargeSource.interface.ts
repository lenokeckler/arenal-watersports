import type { Database } from "@/app/types";
import type { ReservationDetailRecordedCharge } from "./ReservationDetailRecordedCharge.interface";

export interface ReservationDetailChargeSource
  extends
    ReservationDetailRecordedCharge,
    Pick<
      Database["public"]["Tables"]["reservation_charges"]["Row"],
      "created_at" | "created_by" | "id" | "payment_method"
    > {}
