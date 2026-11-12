import type { InventoryPageParameter } from "./InventoryPageParameter.type";

export interface InventoryPageProps {
  modeParameter?: InventoryPageParameter;
  pageParameter: InventoryPageParameter;
  queryParameter?: InventoryPageParameter;
}
