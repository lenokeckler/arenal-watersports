import type { NullableRef } from "@/app/types";
import type { CategoryConfigureChipProps } from "./CategoryConfigureChipProps.interface";

export interface CategoryConfigureStatusCardProps {
  chips: CategoryConfigureChipProps[];
  detail: string;
  missingNote: NullableRef<string>;
  isActive: boolean;
  trackingModeLabel: string;
}
