import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";

const CATEGORY_NAME_COLUMN = "name";

export const findCategoryIdByName = async (
  name: string
): Promise<string> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data, error } = await supabase
    .from(E2E_SUPABASE_TABLE.EQUIPMENT_CATEGORIES)
    .select(E2E_SUPABASE_COLUMN.ID)
    .eq(CATEGORY_NAME_COLUMN, name)
    .single();
  throwIfSupabaseError(error, "findCategoryIdByName");
  if (!data) {
    throw new Error(
      `findCategoryIdByName: no category named ${name}`
    );
  }

  return data.id;
};

export const tryChangeExtraOccupiedQuantity = async (
  extraId: string,
  quantity: number
): Promise<NullableRef<string>> => {
  const supabase = createServiceRoleSupabaseClient();

  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.EXTRAS)
    .update({ occupies_quantity: quantity })
    .eq(E2E_SUPABASE_COLUMN.ID, extraId);

  return error?.code ?? null;
};
