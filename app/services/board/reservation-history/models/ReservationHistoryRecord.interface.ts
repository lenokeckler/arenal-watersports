import type { NullableRef } from "@/app/types";
import type { RecordSignature } from "./RecordSignature.interface";
import type { ReservationHistoryStatus } from "./ReservationHistoryStatus.type";

export interface ReservationHistoryRecord {
  cancellationReason: NullableRef<string>;
  createdBy: RecordSignature;
  customerName: string;
  equipmentNames: readonly string[];
  guideNames: readonly string[];
  id: string;
  startsAt: string;
  status: ReservationHistoryStatus;
  updatedBy: RecordSignature;
}
