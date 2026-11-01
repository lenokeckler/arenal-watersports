import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ALERT_NONE } from "../constants/E2eCategoryAlerts.constants";
import type { CategoryAlertThresholds } from "../models/CategoryAlertThresholds.interface";
import {
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "./categoryFixtures";

const updateCategoryAlerts = async (
  categoryName: string,
  thresholds: CategoryAlertThresholds
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();
  const { error } = await supabase
    .from("equipment_categories")
    .update({
      alert_expiry_days: thresholds.alertExpiryDays,
      alert_min_quantity: thresholds.alertMinQuantity,
    })
    .eq("name", categoryName);
  throwIfSupabaseError(error, "seedCategoryWithAlerts");
};

export const seedCategoryWithAlerts = async (
  categoryName: string,
  thresholds: CategoryAlertThresholds = E2E_ALERT_NONE
): Promise<void> => {
  await seedCategoryWithBehavior(categoryName);

  try {
    await updateCategoryAlerts(categoryName, thresholds);
  } catch (seedError) {
    try {
      await removeDeletableCategory(categoryName);
    } catch (cleanupError) {
      throw new AggregateError(
        [seedError, cleanupError],
        "seedCategoryWithAlerts failed and its cleanup failed"
      );
    }
    throw seedError;
  }
};

export const readCategoryAlerts = async (
  categoryName: string
): Promise<CategoryAlertThresholds> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data: category, error } = await supabase
    .from("equipment_categories")
    .select("alert_expiry_days, alert_min_quantity")
    .eq("name", categoryName)
    .single();
  throwIfSupabaseError(error, "readCategoryAlerts");

  return {
    alertExpiryDays: category?.alert_expiry_days ?? null,
    alertMinQuantity: category?.alert_min_quantity ?? null,
  };
};
