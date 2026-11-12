import type { Nullable } from "@/app/types";

export interface CategoryCardSummaryProps {
  groupName: Nullable<string>;
  isInactive: boolean;
  name: string;
  subtitle: string;
}
