import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  BOARD_CATEGORY_UNITS_OPERATION,
  BOARD_CATEGORY_UNITS_QUERY,
  PATHS,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readBoardCategoryUnits } from "../readBoardCategoryUnits";
import {
  BOARD_SERVICE_POSTGREST_ERROR,
  BOARD_SERVICE_REDIRECT_SIGNAL,
  BOARD_SERVICE_USER,
} from "./BoardCategories.constants";
import {
  BOARD_UNITS_CATEGORY_ID,
  BOARD_UNITS_EMPTY_RESULT,
  BOARD_UNITS_RESULT,
  BOARD_UNITS_ROW,
  BOARD_UNITS_SECOND_PAGE,
  BOARD_UNITS_SECOND_PAGE_RANGE,
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
  order: vi.fn().mockReturnThis(),
  range: vi.fn(),
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
  queryBuilder.range.mockResolvedValue(BOARD_UNITS_RESULT);
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

const readSecondPage = () =>
  readBoardCategoryUnits(
    BOARD_UNITS_CATEGORY_ID,
    BOARD_UNITS_SECOND_PAGE
  );

describe("readBoardCategoryUnits", () => {
  beforeEach(resetMocks);

  it("reads the units of the category ordered by code and id for the requested page", async () => {
    const rows = await readSecondPage();

    expect(from).toHaveBeenCalledWith(
      BOARD_CATEGORY_UNITS_QUERY.VIEW
    );
    expect(queryBuilder.select).toHaveBeenCalledWith(
      BOARD_CATEGORY_UNITS_QUERY.PROJECTION
    );
    expect(queryBuilder.eq).toHaveBeenCalledWith(
      BOARD_CATEGORY_UNITS_QUERY.CATEGORY_COLUMN,
      BOARD_UNITS_CATEGORY_ID
    );
    expect(queryBuilder.order).toHaveBeenNthCalledWith(
      1,
      BOARD_CATEGORY_UNITS_QUERY.ORDER_BY_CODE,
      { ascending: true }
    );
    expect(queryBuilder.order).toHaveBeenNthCalledWith(
      2,
      BOARD_CATEGORY_UNITS_QUERY.ORDER_BY_ID,
      { ascending: true }
    );
    expect(queryBuilder.range).toHaveBeenCalledWith(
      BOARD_UNITS_SECOND_PAGE_RANGE.from,
      BOARD_UNITS_SECOND_PAGE_RANGE.to
    );
    expect(rows).toEqual([BOARD_UNITS_ROW]);
  });

  it("redirects to login without a signed-in user", async () => {
    getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    await expect(readSecondPage()).rejects.toThrow(
      redirectSignal
    );

    expect(supabaseMocks.redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.LOGIN
    );
    expect(from).not.toHaveBeenCalled();
  });

  it("throws the query error with the operation name", async () => {
    queryBuilder.range.mockResolvedValue({
      data: null,
      error: BOARD_SERVICE_POSTGREST_ERROR,
    });

    await expect(readSecondPage()).rejects.toThrow(
      BOARD_CATEGORY_UNITS_OPERATION
    );
  });

  it("returns an empty list when the view has no data", async () => {
    queryBuilder.range.mockResolvedValue(
      BOARD_UNITS_EMPTY_RESULT
    );

    await expect(readSecondPage()).resolves.toEqual([]);
  });
});
