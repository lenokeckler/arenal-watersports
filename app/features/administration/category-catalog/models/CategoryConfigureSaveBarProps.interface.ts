import type { NullableRef } from "@/app/types";
import type { CategoryConfigureSaveStatus } from "../constants/CategoryConfigureSaveStatus.constants";

export interface CategoryConfigureSaveBarProps {
  message: NullableRef<string>;
  status: CategoryConfigureSaveStatus;
  isDisabled: boolean;
  onSave: () => void;
}
