import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { TariffCatalogRow } from "../models/TariffCatalogRow.interface";
import { mapTariffRowToCatalogRow } from "../utils/mapTariffRowToCatalogRow";
import { buildTariffListQuery } from "./buildTariffListQuery";

export const listTariffs = async (): Promise<
  TariffCatalogRow[]
> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRows, error } =
    await buildTariffListQuery(supabase);
  throwIfSupabaseError(error, "listTariffs");

  return (categoryRows ?? []).map(mapTariffRowToCatalogRow);
};
