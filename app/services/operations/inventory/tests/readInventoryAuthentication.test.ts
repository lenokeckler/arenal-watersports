import { beforeEach, expect, it, vi } from "vitest";
import { AuthSessionMissingError } from "@supabase/supabase-js";
import { PAGINATION, PATHS } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { getInventorySummaryPage } from "../readInventory";
import {
  INVENTORY_SERVICE_REDIRECT_SIGNAL,
  INVENTORY_SERVICE_USER,
} from "./InventoryReadService.constants";

const supabaseMocks = vi.hoisted(() => ({
  createServerSupabaseClient: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: supabaseMocks.redirect,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    supabaseMocks.createServerSupabaseClient,
}));

const getUser = vi.fn();
const rpc = vi.fn();
const from = vi.fn();
const redirectSignal = new Error(
  INVENTORY_SERVICE_REDIRECT_SIGNAL
);

const resetMocks = (): void => {
  vi.clearAllMocks();
  getUser.mockResolvedValue({
    data: { user: INVENTORY_SERVICE_USER },
    error: null,
  });
  supabaseMocks.redirect.mockImplementation(() => {
    throw redirectSignal;
  });
  supabaseMocks.createServerSupabaseClient.mockResolvedValue(
    {
      auth: { getUser },
      rpc,
      from,
    } as unknown as Awaited<
      ReturnType<typeof createServerSupabaseClient>
    >
  );
};

beforeEach(resetMocks);

it("requires authentication before accessing the inventory", async () => {
  getUser.mockResolvedValue({
    data: { user: null },
    error: null,
  });

  await expect(
    getInventorySummaryPage(PAGINATION.DEFAULT_PAGE)
  ).rejects.toThrow(redirectSignal);

  expect(supabaseMocks.redirect).toHaveBeenCalledWith(
    PATHS.ACCESS.LOGIN
  );
  expect(rpc).not.toHaveBeenCalled();
  expect(from).not.toHaveBeenCalled();
});

it("redirects a missing Supabase session to login", async () => {
  getUser.mockResolvedValue({
    data: { user: null },
    error: new AuthSessionMissingError(),
  });

  await expect(
    getInventorySummaryPage(PAGINATION.DEFAULT_PAGE)
  ).rejects.toThrow(redirectSignal);

  expect(supabaseMocks.redirect).toHaveBeenCalledWith(
    PATHS.ACCESS.LOGIN
  );
  expect(rpc).not.toHaveBeenCalled();
  expect(from).not.toHaveBeenCalled();
});
