import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { TariffForEdit } from "../models/TariffForEdit.type";
import { mapTariffRowToCatalogRow } from "../utils/mapTariffRowToCatalogRow";
import { buildTariffForEditQuery } from "./buildTariffForEditQuery";

export const getTariffForEdit = async (
  categoryId: string
): Promise<NullableRef<TariffForEdit>> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRow, error } =
    await buildTariffForEditQuery(supabase, categoryId);
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "getTariffForEdit");

  return categoryRow
    ? mapTariffRowToCatalogRow(categoryRow)
    : null;
};
