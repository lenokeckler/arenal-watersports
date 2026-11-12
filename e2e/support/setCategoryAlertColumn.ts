import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const setCategoryAlertColumn = async (
  categoryName: string,
  column: string,
  value: number | null
): Promise<number | null> => {
  const client = createServiceRoleClient();
  const { data: current, error: readError } = await client
    .from(E2E_SUPABASE_TABLE.EQUIPMENT_CATEGORIES)
    .select(column)
    .eq("name", categoryName)
    .single();

  if (readError || !current) {
    return failE2eOperation(
      "read the category alert",
      readError?.message ?? "no row"
    );
  }

  const { error } = await client
    .from(E2E_SUPABASE_TABLE.EQUIPMENT_CATEGORIES)
    .update({ [column]: value })
    .eq("name", categoryName);

  if (error) {
    return failE2eOperation(
      "update the category alert",
      error.message
    );
  }

  const previous = (
    current as unknown as Record<string, number | null>
  )[column];

  return previous;
};
