import { beforeEach, expect, it, vi } from "vitest";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_SYSTEM_ROUTE_READ } from "@/e2e/constants/E2eSystemRoute.constants";
import { readSeededInventoryCategoryId } from "@/e2e/support/readSeededInventoryCategoryId";
import { SYSTEM_ROUTE_DEFAULTS } from "./SystemRoute.constants";

const { categoryQuery } = vi.hoisted(() => ({
  categoryQuery: {
    from: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn(),
    order: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
  },
}));

vi.mock("@/e2e/support/createServiceRoleClient", () => ({
  createServiceRoleClient: () => categoryQuery,
}));

beforeEach(() => {
  vi.clearAllMocks();
  categoryQuery.maybeSingle.mockResolvedValue(
    SYSTEM_ROUTE_DEFAULTS.readerResult
  );
});

it("returns the UUID of a seeded category", async () => {
  await expect(
    readSeededInventoryCategoryId()
  ).resolves.toBe(SYSTEM_ROUTE_DEFAULTS.categoryId);
});

it("rejects query errors even when a category is returned", async () => {
  categoryQuery.maybeSingle.mockResolvedValue({
    ...SYSTEM_ROUTE_DEFAULTS.readerResult,
    error: SYSTEM_ROUTE_DEFAULTS.queryError,
  });

  await expect(
    readSeededInventoryCategoryId()
  ).rejects.toThrow(SupabaseQueryError);
});

it("rejects an empty seed instead of inventing a route", async () => {
  categoryQuery.maybeSingle.mockResolvedValue({
    ...SYSTEM_ROUTE_DEFAULTS.readerResult,
    data: null,
  });

  await expect(
    readSeededInventoryCategoryId()
  ).rejects.toThrow(E2E_SYSTEM_ROUTE_READ.MISSING_CATEGORY);
});

it("rejects an invalid category UUID", async () => {
  categoryQuery.maybeSingle.mockResolvedValue({
    ...SYSTEM_ROUTE_DEFAULTS.readerResult,
    data: {
      category_id: SYSTEM_ROUTE_DEFAULTS.invalidCategoryId,
    },
  });

  await expect(
    readSeededInventoryCategoryId()
  ).rejects.toThrow(E2E_SYSTEM_ROUTE_READ.MISSING_CATEGORY);
});
