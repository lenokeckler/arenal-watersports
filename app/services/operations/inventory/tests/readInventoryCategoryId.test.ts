import { beforeEach, expect, it, vi } from "vitest";
import { PAGINATION } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { getInventoryCategoryDetails } from "../readInventory";
import {
  INVENTORY_SERVICE_INVALID_CATEGORY_ID,
  INVENTORY_SERVICE_USER,
} from "./InventoryReadService.constants";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));

const getUser = vi.fn();
const rpc = vi.fn();
const from = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  getUser.mockResolvedValue({
    data: { user: INVENTORY_SERVICE_USER },
    error: null,
  });
  rpc.mockResolvedValue({ data: true, error: null });
  supabaseMocks.createServerSupabaseClient.mockResolvedValue(
    {
      auth: { getUser },
      from,
      rpc,
    } as unknown as Awaited<
      ReturnType<typeof createServerSupabaseClient>
    >
  );
});

it("does not query Supabase with a malformed category id", async () => {
  const categoryDetails = await getInventoryCategoryDetails(
    INVENTORY_SERVICE_INVALID_CATEGORY_ID,
    PAGINATION.DEFAULT_PAGE
  );

  expect(categoryDetails.summary).toBeNull();
  expect(categoryDetails.units.items).toEqual([]);
  expect(from).not.toHaveBeenCalled();
});
