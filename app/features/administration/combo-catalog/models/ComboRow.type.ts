import type { QueryData } from "@supabase/supabase-js";
import type { buildComboListQuery } from "../services/buildComboListQuery";

export type ComboRow = QueryData<
  ReturnType<typeof buildComboListQuery>
>[number];
