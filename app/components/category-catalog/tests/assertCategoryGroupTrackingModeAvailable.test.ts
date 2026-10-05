import { describe, expect, it, vi } from "vitest";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import {
  assertCategoryGroupTrackingModeAvailable,
  CategoryGroupConflictError,
} from "../services/assertCategoryGroupTrackingModeAvailable";

const FAKE_GROUP_NAME = "fake-group-name";
const DIFFERENTLY_CASED_GROUP_NAME = "FAKE-GROUP-NAME";

const buildFakeCategoriesQuery = (
  data: NullableRef<unknown[]>,
  error: unknown
) => ({
  select: vi.fn(() => ({
    ilike: vi.fn(() => ({
      neq: vi.fn(() => ({
        limit: vi.fn().mockResolvedValue({ data, error }),
      })),
    })),
  })),
});

const createFakeServerSupabaseClient = (
  categoriesQuery = buildFakeCategoriesQuery([], null)
): ServerSupabaseClient =>
  ({
    from: vi.fn(() => categoriesQuery),
  }) as unknown as ServerSupabaseClient;

describe("assertCategoryGroupTrackingModeAvailable", () => {
  it("resolves when no category in the group uses a different tracking mode", async () => {
    const supabase = createFakeServerSupabaseClient();

    await expect(
      assertCategoryGroupTrackingModeAvailable(supabase, {
        groupName: FAKE_GROUP_NAME,
        trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      })
    ).resolves.toBeUndefined();
  });

  it("throws CategoryGroupConflictError when a category in the group uses a different tracking mode", async () => {
    const supabase = createFakeServerSupabaseClient(
      buildFakeCategoriesQuery(
        [
          {
            tracking_mode:
              CATEGORY_TRACKING_MODE.BY_QUANTITY,
          },
        ],
        null
      )
    );

    await expect(
      assertCategoryGroupTrackingModeAvailable(supabase, {
        groupName: FAKE_GROUP_NAME,
        trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      })
    ).rejects.toThrow(CategoryGroupConflictError);
  });

  it("throws CategoryGroupConflictError when the conflicting group name differs only in case", async () => {
    const supabase = createFakeServerSupabaseClient(
      buildFakeCategoriesQuery(
        [
          {
            tracking_mode:
              CATEGORY_TRACKING_MODE.BY_QUANTITY,
          },
        ],
        null
      )
    );

    await expect(
      assertCategoryGroupTrackingModeAvailable(supabase, {
        groupName: DIFFERENTLY_CASED_GROUP_NAME,
        trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      })
    ).rejects.toThrow(CategoryGroupConflictError);
  });

  it("throws the underlying query error instead of CategoryGroupConflictError when the read fails", async () => {
    const supabase = createFakeServerSupabaseClient(
      buildFakeCategoriesQuery(null, {
        code: "500",
        message: "boom",
      })
    );

    await expect(
      assertCategoryGroupTrackingModeAvailable(supabase, {
        groupName: FAKE_GROUP_NAME,
        trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      })
    ).rejects.toThrow(SupabaseQueryError);
  });
});
