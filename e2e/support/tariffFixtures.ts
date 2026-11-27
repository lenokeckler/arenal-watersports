import { TARIFF_FORM_TYPE_ORDER } from "@/app/features/administration/tariff-catalog/constants/TariffFormTypeOrder.constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import type { TariffSeedInput } from "../models/TariffSeedInput.interface";
import {
  findCategoryId,
  removeDeletableCategory,
  seedCategoryWithBehavior,
} from "./categoryFixtures";

export const insertTariffCategory = async (
  categoryName: string
): Promise<string> => {
  await seedCategoryWithBehavior(categoryName);

  return findCategoryId(categoryName);
};

export const insertTariffs = async (
  categoryId: string,
  input: Pick<TariffSeedInput, "rental" | "tour">
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();
  const rows = TARIFF_FORM_TYPE_ORDER.flatMap((type) => {
    const amounts = input[type];

    return amounts
      ? [
          {
            amount_crc: amounts.crc,
            amount_usd: amounts.usd,
            category_id: categoryId,
            created_by: E2E_ADMIN_ACCOUNT.workerId,
            type,
            updated_by: E2E_ADMIN_ACCOUNT.workerId,
          },
        ]
      : [];
  });
  if (rows.length === 0) {
    return;
  }

  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.TARIFFS)
    .insert(rows);
  throwIfSupabaseError(error, "insertTariffs");
};

export const removeTariffCategory = async (
  categoryId: string,
  categoryName: string
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();

  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.TARIFFS)
    .delete()
    .eq(E2E_SUPABASE_COLUMN.CATEGORY_ID, categoryId);
  throwIfSupabaseError(error, "removeTariffs");

  await removeDeletableCategory(categoryName);
};
