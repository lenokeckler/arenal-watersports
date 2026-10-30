import { describe, expect, it, vi } from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { fetchCategoryIdsWithRecords } from "../services/fetchCategoryIdsWithRecords";

const buildSupabase = () => {
  const inFilter = vi.fn((_column: string, ids: string[]) =>
    Promise.resolve({
      data: ids.map((id) => ({ category_id: id })),
      error: null,
    })
  );
  const select = vi.fn(() => ({ in: inFilter }));
  const from = vi.fn(() => ({ select }));
  return {
    client: { from } as unknown as ServerSupabaseClient,
    from,
    inFilter,
  };
};

describe("fetchCategoryIdsWithRecords", () => {
  it("does not query anything when the page has no categories", async () => {
    const { client, from } = buildSupabase();

    const result = await fetchCategoryIdsWithRecords(
      client,
      []
    );

    expect(result.size).toBe(0);
    expect(from).not.toHaveBeenCalled();
  });

  it("limits both reads to the ids of the page", async () => {
    const { client, inFilter } = buildSupabase();

    const result = await fetchCategoryIdsWithRecords(
      client,
      ["a", "b"]
    );

    expect(inFilter).toHaveBeenCalledTimes(2);
    expect(inFilter).toHaveBeenCalledWith("category_id", [
      "a",
      "b",
    ]);
    expect([...result].sort()).toEqual(["a", "b"]);
  });
});
