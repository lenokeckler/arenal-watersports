import type { NullableRef } from "@/app/types";

export interface CategoryAvailabilityPanelStateInput {
  availability: NullableRef<number>;
  categoryId: string;
  hasError: boolean;
  isLoading: boolean;
  isValidInterval: boolean;
}
