import { describe, expect, it, vi } from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { readCategoryRow } from "../services/readCategoryRow";

const FAKE_ROW = { id: "category-id" };
const FAKE_CLIENT = { from: vi.fn() };
const OPERATION = "readCategoryRowTest";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi
    .fn()
    .mockResolvedValue({ from: vi.fn() }),
}));

const run = (response: object) =>
  readCategoryRow({
    query: () => Promise.resolve(response as never),
    map: (row: typeof FAKE_ROW) => row.id,
    operation: OPERATION,
  });

describe("readCategoryRow", () => {
  it("maps the row it found", async () => {
    await expect(
      run({ data: FAKE_ROW, error: null })
    ).resolves.toBe(FAKE_ROW.id);
  });

  it("is null when no row matched", async () => {
    await expect(
      run({ data: null, error: null })
    ).resolves.toBeNull();
  });

  it("is null for a malformed id", async () => {
    await expect(
      run({
        data: null,
        error: {
          code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        },
      })
    ).resolves.toBeNull();
  });

  it("throws any other database error", async () => {
    await expect(
      run({ data: null, error: { code: "XX000" } })
    ).rejects.toThrow(SupabaseQueryError);
  });

  it("hands the server client to the query", async () => {
    const query = vi.fn().mockResolvedValue({
      data: null,
      error: null,
    });

    await readCategoryRow({
      query,
      map: () => FAKE_CLIENT,
      operation: OPERATION,
    });

    expect(query).toHaveBeenCalledTimes(1);
  });
});
