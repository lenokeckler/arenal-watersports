import type { Database, NullableRef } from "@/app/types";

export type ReservationHistoryRecordRow = Omit<
  Database["public"]["Functions"]["get_reservation_history_record"]["Returns"][number],
  "cancellation_reason"
> & { cancellation_reason: NullableRef<string> };
