import { describe, expect, it, vi } from "vitest";
import type { ServiceRoleSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import {
  assertCategoryHasNoRecords,
  CategoryHasRecordsError,
} from "../services/assertCategoryHasNoRecords";

const FAKE_CATEGORY_ID = "fake-category-id";

const buildFakeTableQuery = (
  data: NullableRef<unknown[]>,
  error: unknown
) => ({
  select: vi.fn(() => ({
    eq: vi.fn().mockResolvedValue({ data, error }),
  })),
});

const createFakeServiceRoleSupabaseClient = (
  unitsQuery = buildFakeTableQuery([], null),
  stockQuery = buildFakeTableQuery([], null)
): ServiceRoleSupabaseClient =>
  ({
    from: vi.fn((tableName: string) =>
      tableName === "equipment_units"
        ? unitsQuery
        : stockQuery
    ),
  }) as unknown as ServiceRoleSupabaseClient;

describe("assertCategoryHasNoRecords", () => {
  it("resolves when neither equipment_units nor equipment_stock has a row for the category", async () => {
    const supabase = createFakeServiceRoleSupabaseClient();

    await expect(
      assertCategoryHasNoRecords(supabase, FAKE_CATEGORY_ID)
    ).resolves.toBeUndefined();
  });

  it("throws CategoryHasRecordsError when the category has a unit", async () => {
    const supabase = createFakeServiceRoleSupabaseClient(
      buildFakeTableQuery([{ id: "unit-1" }], null)
    );

    await expect(
      assertCategoryHasNoRecords(supabase, FAKE_CATEGORY_ID)
    ).rejects.toThrow(CategoryHasRecordsError);
  });

  it("throws CategoryHasRecordsError when the category has a stock row", async () => {
    const supabase = createFakeServiceRoleSupabaseClient(
      undefined,
      buildFakeTableQuery(
        [{ category_id: FAKE_CATEGORY_ID }],
        null
      )
    );

    await expect(
      assertCategoryHasNoRecords(supabase, FAKE_CATEGORY_ID)
    ).rejects.toThrow(CategoryHasRecordsError);
  });

  it("throws the underlying query error instead of CategoryHasRecordsError when the units read fails", async () => {
    const supabase = createFakeServiceRoleSupabaseClient(
      buildFakeTableQuery(null, {
        code: "500",
        message: "boom",
      })
    );

    await expect(
      assertCategoryHasNoRecords(supabase, FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });

  it("throws the underlying query error instead of CategoryHasRecordsError when the stock read fails", async () => {
    const supabase = createFakeServiceRoleSupabaseClient(
      undefined,
      buildFakeTableQuery(null, {
        code: "500",
        message: "boom",
      })
    );

    await expect(
      assertCategoryHasNoRecords(supabase, FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
