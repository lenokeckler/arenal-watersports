import type { QueryData } from "@supabase/supabase-js";
import type { buildComboForEditQuery } from "../services/buildComboForEditQuery";

export type ComboForEditRow = NonNullable<
  QueryData<ReturnType<typeof buildComboForEditQuery>>
>;
