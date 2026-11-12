import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ReadCategoryRowOptions } from "../models/ReadCategoryRowOptions.interface";

export const readCategoryRow = async <Row, Category>({
  query,
  map,
  operation,
}: ReadCategoryRowOptions<Row, Category>): Promise<
  NullableRef<Category>
> => {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await query(supabase);
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, operation);

  return data ? map(data) : null;
};
