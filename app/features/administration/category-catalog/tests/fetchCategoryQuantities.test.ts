import { describe, expect, it, vi } from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { fetchCategoryQuantities } from "../services/fetchCategoryQuantities";
import type { CategoryQuantityRow } from "./models/CategoryQuantityRow.interface";

const QUANTITY_VIEW = "category_current_quantity";
const READ_ERROR = { message: "read failed" };

const buildSupabase = (
  quantityRows: CategoryQuantityRow[],
  error: NullableRef<typeof READ_ERROR> = null
) => {
  const inFilter = vi.fn(() =>
    Promise.resolve({ data: quantityRows, error })
  );
  const select = vi.fn(() => ({ in: inFilter }));
  const from = vi.fn(() => ({ select }));
  return {
    client: { from } as unknown as ServerSupabaseClient,
    from,
    inFilter,
  };
};

describe("fetchCategoryQuantities", () => {
  it("does not query anything when the page has no categories", async () => {
    const { client, from } = buildSupabase([]);

    const result = await fetchCategoryQuantities(
      client,
      []
    );

    expect(result.size).toBe(0);
    expect(from).not.toHaveBeenCalled();
  });

  it("reads the quantities of the given categories from the view", async () => {
    const { client, from, inFilter } = buildSupabase([
      { category_id: "first", current_quantity: 24 },
      { category_id: "second", current_quantity: 6 },
    ]);

    const result = await fetchCategoryQuantities(client, [
      "first",
      "second",
    ]);

    expect(from).toHaveBeenCalledWith(QUANTITY_VIEW);
    expect(inFilter).toHaveBeenCalledWith("category_id", [
      "first",
      "second",
    ]);
    expect(result.get("first")).toBe(24);
    expect(result.get("second")).toBe(6);
  });

  it("skips a row without a category id and reads a missing quantity as zero", async () => {
    const { client } = buildSupabase([
      { category_id: null, current_quantity: 3 },
      { category_id: "empty", current_quantity: null },
    ]);

    const result = await fetchCategoryQuantities(client, [
      "empty",
    ]);

    expect(result.size).toBe(1);
    expect(result.get("empty")).toBe(0);
  });

  it("throws when the read fails", async () => {
    const { client } = buildSupabase([], READ_ERROR);

    await expect(
      fetchCategoryQuantities(client, ["first"])
    ).rejects.toThrow();
  });
});
