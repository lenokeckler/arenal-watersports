import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_DEPOSIT_NONE } from "../constants/E2eCategoryDeposit.constants";
import type { CategoryDepositAmounts } from "../models/CategoryDepositAmounts.interface";
import {
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "./categoryFixtures";

const updateCategoryDeposit = async (
  categoryName: string,
  amounts: CategoryDepositAmounts
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();
  const { error } = await supabase
    .from("equipment_categories")
    .update({
      deposit_crc: amounts.depositCrc,
      deposit_usd: amounts.depositUsd,
    })
    .eq("name", categoryName);
  throwIfSupabaseError(error, "seedCategoryWithDeposit");
};

export const seedCategoryWithDeposit = async (
  categoryName: string,
  amounts: CategoryDepositAmounts = E2E_DEPOSIT_NONE
): Promise<void> => {
  await seedCategoryWithBehavior(categoryName);

  try {
    await updateCategoryDeposit(categoryName, amounts);
  } catch (seedError) {
    try {
      await removeDeletableCategory(categoryName);
    } catch (cleanupError) {
      throw new AggregateError(
        [seedError, cleanupError],
        "seedCategoryWithDeposit failed and its cleanup failed"
      );
    }
    throw seedError;
  }
};

export const readCategoryDeposit = async (
  categoryName: string
): Promise<CategoryDepositAmounts> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data: category, error } = await supabase
    .from("equipment_categories")
    .select("deposit_crc, deposit_usd")
    .eq("name", categoryName)
    .single();
  throwIfSupabaseError(error, "readCategoryDeposit");

  return {
    depositCrc: category?.deposit_crc ?? null,
    depositUsd: category?.deposit_usd ?? null,
  };
};
