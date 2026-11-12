import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const setStockExpiryDate = async (
  categoryName: string,
  expiryDate: string | null
): Promise<string | null> => {
  const client = createServiceRoleClient();
  const { data: category, error: categoryError } =
    await client
      .from(E2E_SUPABASE_TABLE.EQUIPMENT_CATEGORIES)
      .select("id")
      .eq("name", categoryName)
      .single();

  if (categoryError || !category) {
    return failE2eOperation(
      "find the category of the stock",
      categoryError?.message ?? "no row"
    );
  }

  const { data: stock, error: stockError } = await client
    .from("equipment_stock")
    .select("expiry_date")
    .eq("category_id", category.id)
    .single();

  if (stockError || !stock) {
    return failE2eOperation(
      "read the expiry date of the stock",
      stockError?.message ?? "no row"
    );
  }

  const { error } = await client
    .from("equipment_stock")
    .update({ expiry_date: expiryDate })
    .eq("category_id", category.id);

  if (error) {
    return failE2eOperation(
      "update the expiry date of the stock",
      error.message
    );
  }

  return stock.expiry_date;
};
