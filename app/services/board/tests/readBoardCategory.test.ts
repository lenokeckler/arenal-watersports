import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  BOARD_CATEGORY_DETAIL_OPERATION,
  BOARD_CATEGORY_QUERY,
  PATHS,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readBoardCategory } from "../readBoardCategory";
import {
  BOARD_SERVICE_POSTGREST_ERROR,
  BOARD_SERVICE_REDIRECT_SIGNAL,
  BOARD_SERVICE_ROW,
  BOARD_SERVICE_USER,
} from "./BoardCategories.constants";
import {
  BOARD_UNITS_CATEGORY_ID,
  BOARD_UNITS_INVALID_CATEGORY_ID,
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

const getUser = vi.fn();
const from = vi.fn();
const queryBuilder = {
  eq: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn(),
  select: vi.fn().mockReturnThis(),
};
const redirectSignal = new Error(
  BOARD_SERVICE_REDIRECT_SIGNAL
);

const resetMocks = (): void => {
  vi.clearAllMocks();
  getUser.mockResolvedValue({
    data: { user: BOARD_SERVICE_USER },
    error: null,
  });
  from.mockReturnValue(queryBuilder);
  queryBuilder.maybeSingle.mockResolvedValue({
    data: BOARD_SERVICE_ROW,
    error: null,
  });
  supabaseMocks.redirect.mockImplementation(() => {
    throw redirectSignal;
  });
  supabaseMocks.createServerSupabaseClient.mockResolvedValue(
    {
      auth: { getUser },
      from,
    } as unknown as Awaited<
      ReturnType<typeof createServerSupabaseClient>
    >
  );
};

describe("readBoardCategory", () => {
  beforeEach(resetMocks);

  it("reads the summary row of the category", async () => {
    const row = await readBoardCategory(
      BOARD_UNITS_CATEGORY_ID
    );

    expect(from).toHaveBeenCalledWith(
      BOARD_CATEGORY_QUERY.VIEW
    );
    expect(queryBuilder.select).toHaveBeenCalledWith(
      BOARD_CATEGORY_QUERY.PROJECTION
    );
    expect(queryBuilder.eq).toHaveBeenCalledWith(
      BOARD_CATEGORY_QUERY.CATEGORY_ID_COLUMN,
      BOARD_UNITS_CATEGORY_ID
    );
    expect(row).toEqual(BOARD_SERVICE_ROW);
  });

  it("returns null when the category is not on the board", async () => {
    queryBuilder.maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      readBoardCategory(BOARD_UNITS_CATEGORY_ID)
    ).resolves.toBeNull();
  });

  it("returns null for an invalid id without querying", async () => {
    await expect(
      readBoardCategory(BOARD_UNITS_INVALID_CATEGORY_ID)
    ).resolves.toBeNull();

    expect(
      supabaseMocks.createServerSupabaseClient
    ).not.toHaveBeenCalled();
    expect(from).not.toHaveBeenCalled();
  });

  it("redirects to login without a signed-in user", async () => {
    getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    await expect(
      readBoardCategory(BOARD_UNITS_CATEGORY_ID)
    ).rejects.toThrow(redirectSignal);

    expect(supabaseMocks.redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.LOGIN
    );
    expect(from).not.toHaveBeenCalled();
  });

  it("throws the query error with the operation name", async () => {
    queryBuilder.maybeSingle.mockResolvedValue({
      data: null,
      error: BOARD_SERVICE_POSTGREST_ERROR,
    });

    await expect(
      readBoardCategory(BOARD_UNITS_CATEGORY_ID)
    ).rejects.toThrow(BOARD_CATEGORY_DETAIL_OPERATION);
  });
});
