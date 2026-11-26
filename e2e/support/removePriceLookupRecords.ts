import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { PriceLookupLedger } from "../models/PriceLookupLedger.interface";
import { removeExtras } from "./extraFixtures";

export const removePriceLookupRecords = async (
  ledger: PriceLookupLedger
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();

  const { error: itemsError } = await supabase
    .from("combo_items")
    .delete()
    .in("combo_id", ledger.comboIds);
  throwIfSupabaseError(
    itemsError,
    "removePriceLookupItems"
  );

  const { error: combosError } = await supabase
    .from("combos")
    .delete()
    .in("id", ledger.comboIds);
  throwIfSupabaseError(
    combosError,
    "removePriceLookupCombos"
  );

  const { error: tariffsError } = await supabase
    .from("tariffs")
    .delete()
    .in("category_id", ledger.categoryIds);
  throwIfSupabaseError(
    tariffsError,
    "removePriceLookupTariffs"
  );

  const { error: stockError } = await supabase
    .from("equipment_stock")
    .delete()
    .in("category_id", ledger.categoryIds);
  throwIfSupabaseError(
    stockError,
    "removePriceLookupStock"
  );

  const { error: categoriesError } = await supabase
    .from("equipment_categories")
    .delete()
    .in("id", ledger.categoryIds);
  throwIfSupabaseError(
    categoriesError,
    "removePriceLookupCategories"
  );

  await removeExtras(ledger.extraIds);
};
