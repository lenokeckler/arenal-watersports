import type { BoardUnitFilter } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { BoardPendingDispatch } from "@/app/services/operations/models/BoardPendingDispatch.interface";

export interface EquipmentBoardProps {
  filter?: BoardUnitFilter;
  equipmentPending?: NullableRef<number>;
  pendingDispatch?: BoardPendingDispatch;
}
