import type { BoardUnitFilter } from "@/app/constants";
import type { BoardPendingDispatch } from "@/app/services/operations/models/BoardPendingDispatch.interface";

export interface EquipmentBoardProps {
  filter?: BoardUnitFilter;
  pendingDispatch?: BoardPendingDispatch;
}
