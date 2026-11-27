import type { NullableRef } from "@/app/types";
import type { CategoryConfigureLeaveSheetProps } from "./CategoryConfigureLeaveSheetProps.interface";

export interface CategoryConfigureLeaveViewModel {
  hasUnsavedChanges: boolean;
  onRequestLeave: () => void;
  sheet: NullableRef<CategoryConfigureLeaveSheetProps>;
}
