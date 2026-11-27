import type { UnitPhotoListItem } from "./UnitPhotoListItem.interface";

import type { CardGridSize } from "@/app/utils/card-grid/models/CardGridSize.type";

export interface UnitPhotoListCardProps {
  size: CardGridSize;
  item: UnitPhotoListItem;
}
