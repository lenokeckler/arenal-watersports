import type { buildBoardCards } from "../utils/buildBoardCards";
import type { EquipmentBoardProps } from "./EquipmentBoardProps.interface";

export interface EquipmentBoardToolbarProps {
  cards: ReturnType<typeof buildBoardCards>;
  filter: NonNullable<EquipmentBoardProps["filter"]>;
  pendingDispatch: EquipmentBoardProps["pendingDispatch"];
}
