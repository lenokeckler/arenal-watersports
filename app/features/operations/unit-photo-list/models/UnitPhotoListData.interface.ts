import type { NullableRef } from "@/app/types";
import type { UnitPhotoCategory } from "./UnitPhotoCategory.interface";
import type { UnitPhotoListItem } from "./UnitPhotoListItem.interface";

export interface UnitPhotoListData {
  categories: UnitPhotoCategory[];
  categoryId: NullableRef<string>;
  items: UnitPhotoListItem[];
  page: number;
  pageCount: number;
}
