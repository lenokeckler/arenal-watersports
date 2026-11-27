import type { QueryData } from "@supabase/supabase-js";
import type { buildTariffListQuery } from "../services/buildTariffListQuery";

export type TariffRow = QueryData<
  ReturnType<typeof buildTariffListQuery>
>[number];
