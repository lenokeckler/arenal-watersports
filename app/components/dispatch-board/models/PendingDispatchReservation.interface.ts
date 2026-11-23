import type { Database, NullableRef } from "@/app/types";
import type { PendingDispatchEquipment } from "./PendingDispatchEquipment.interface";

export interface PendingDispatchReservation {
  id: string;
  code: string;
  customer_name: string;
  dock_notified_at: NullableRef<string>;
  ends_at: string;
  equipment: PendingDispatchEquipment[];
  isCombo: boolean;
  starts_at: string;
  status: Database["public"]["Enums"]["reservation_status"];
}
