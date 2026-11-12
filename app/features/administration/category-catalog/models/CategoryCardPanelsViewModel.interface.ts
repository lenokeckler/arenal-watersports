import type { NullableRef } from "@/app/types";

export interface CategoryCardPanelsViewModel {
  onTogglePanelClick: (categoryId: string) => () => void;
  openCategoryId: NullableRef<string>;
}
