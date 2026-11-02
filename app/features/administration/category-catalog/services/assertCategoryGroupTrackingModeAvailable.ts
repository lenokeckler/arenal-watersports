import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { LENGTH } from "@/app/constants";
import { escapeLikePattern } from "@/app/utils/like-pattern/escapeLikePattern";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { CategoryGroupTrackingModeCheck } from "../models/CategoryGroupTrackingModeCheck.interface";
import type { CategoryTrackingMode } from "../models/CategoryTrackingMode.type";

export class CategoryGroupConflictError extends Error {
  constructor(
    public readonly existingTrackingMode: CategoryTrackingMode
  ) {
    super();
  }
}

export const assertCategoryGroupTrackingModeAvailable =
  async (
    supabase: ServerSupabaseClient,
    check: CategoryGroupTrackingModeCheck
  ): Promise<void> => {
    const { data: conflictingCategories, error } =
      await supabase
        .from("equipment_categories")
        .select("tracking_mode")
        .ilike(
          "group_name",
          escapeLikePattern(check.groupName)
        )
        .neq("tracking_mode", check.trackingMode)
        .limit(LENGTH.ONE);
    throwIfSupabaseError(
      error,
      "assertCategoryGroupTrackingModeAvailable"
    );

    const [conflictingCategory] =
      conflictingCategories ?? [];

    if (conflictingCategory) {
      throw new CategoryGroupConflictError(
        conflictingCategory.tracking_mode
      );
    }
  };
