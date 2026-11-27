import { randomUUID } from "node:crypto";
import { RESERVATION_TYPE } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  E2E_PRICE_LOOKUP_AMOUNT,
  E2E_PRICE_LOOKUP_STATUS,
} from "../constants/E2ePriceLookup.constants";
import type { PriceLookupSeedStatus } from "../models/PriceLookupSeedStatus.type";
import { createPredefinedComboFixtureCategory } from "./createPredefinedComboFixtureCategory";

export const insertPriceLookupCategory = async (
  name: string,
  status: PriceLookupSeedStatus,
  workerId: string
): Promise<string> => {
  const supabase = createServiceRoleSupabaseClient();
  const categoryId = randomUUID();

  await createPredefinedComboFixtureCategory(
    supabase,
    workerId,
    categoryId,
    name
  );
  const { error: tariffsError } = await supabase
    .from("tariffs")
    .insert([
      {
        amount_crc: E2E_PRICE_LOOKUP_AMOUNT.RENTAL_CRC,
        amount_usd: E2E_PRICE_LOOKUP_AMOUNT.RENTAL_USD,
        category_id: categoryId,
        created_by: workerId,
        type: RESERVATION_TYPE.RENTAL,
        updated_by: workerId,
      },
      {
        amount_crc: null,
        amount_usd: E2E_PRICE_LOOKUP_AMOUNT.TOUR_USD,
        category_id: categoryId,
        created_by: workerId,
        type: RESERVATION_TYPE.TOUR,
        updated_by: workerId,
      },
    ]);
  throwIfSupabaseError(
    tariffsError,
    "insertPriceLookupTariffs"
  );

  if (status === E2E_PRICE_LOOKUP_STATUS.INACTIVE) {
    const { error: statusError } = await supabase
      .from("equipment_categories")
      .update({ status })
      .eq("id", categoryId);
    throwIfSupabaseError(
      statusError,
      "deactivatePriceLookupCategory"
    );
  }

  return categoryId;
};
