import { beforeEach, expect, it, vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readBoardCategoryUnits } from "../readBoardCategoryUnits";
import {
  BOARD_SERVICE_REDIRECT_SIGNAL,
  BOARD_SERVICE_USER,
} from "./BoardCategories.constants";
import {
  BOARD_UNITS_CATEGORY_ID,
  BOARD_UNITS_EMPTY_RESULT,
  BOARD_UNITS_SECOND_PAGE,
} from "./BoardCategoryUnits.constants";

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

vi.mock(
  "@/app/services/work-mode/assertActiveWorkAreaAccess"
);

const getUser = vi.fn();
const range = vi.fn();
const from = vi.fn(() => ({
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  range,
  select: vi.fn().mockReturnThis(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  getUser.mockResolvedValue({
    data: { user: BOARD_SERVICE_USER },
    error: null,
  });
  range.mockResolvedValue(BOARD_UNITS_EMPTY_RESULT);
  supabaseMocks.redirect.mockImplementation(() => {
    throw new Error(BOARD_SERVICE_REDIRECT_SIGNAL);
  });
  supabaseMocks.createServerSupabaseClient.mockResolvedValue(
    {
      auth: { getUser },
      from,
    } as unknown as Awaited<
      ReturnType<typeof createServerSupabaseClient>
    >
  );
});

it("returns an empty list when the view has no data", async () => {
  await expect(
    readBoardCategoryUnits(
      BOARD_UNITS_CATEGORY_ID,
      BOARD_UNITS_SECOND_PAGE
    )
  ).resolves.toEqual([]);
});
