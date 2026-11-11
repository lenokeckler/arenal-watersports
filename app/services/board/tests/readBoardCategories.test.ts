import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  BOARD_CATEGORY_OPERATION,
  BOARD_CATEGORY_QUERY,
  PATHS,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readBoardCategories } from "../readBoardCategories";
import {
  BOARD_SERVICE_EMPTY_RESULT,
  BOARD_SERVICE_POSTGREST_ERROR,
  BOARD_SERVICE_REDIRECT_SIGNAL,
  BOARD_SERVICE_RESULT,
  BOARD_SERVICE_ROW,
  BOARD_SERVICE_USER,
} from "./BoardCategories.constants";

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
  order: vi.fn(),
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
  queryBuilder.order.mockResolvedValue(
    BOARD_SERVICE_RESULT
  );
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

describe("readBoardCategories", () => {
  beforeEach(resetMocks);

  it("reads the board view ordered by category name ascending", async () => {
    const rows = await readBoardCategories();

    expect(from).toHaveBeenCalledWith(
      BOARD_CATEGORY_QUERY.VIEW
    );
    expect(queryBuilder.select).toHaveBeenCalledWith(
      BOARD_CATEGORY_QUERY.PROJECTION
    );
    expect(queryBuilder.order).toHaveBeenCalledWith(
      BOARD_CATEGORY_QUERY.ORDER_BY,
      { ascending: true }
    );
    expect(rows).toEqual([BOARD_SERVICE_ROW]);
  });

  it("redirects to login without a signed-in user", async () => {
    getUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    await expect(readBoardCategories()).rejects.toThrow(
      redirectSignal
    );

    expect(supabaseMocks.redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.LOGIN
    );
    expect(from).not.toHaveBeenCalled();
  });

  it("throws the query error with the operation name", async () => {
    queryBuilder.order.mockResolvedValue({
      data: null,
      error: BOARD_SERVICE_POSTGREST_ERROR,
    });

    await expect(readBoardCategories()).rejects.toThrow(
      BOARD_CATEGORY_OPERATION
    );
  });

  it("returns an empty list when the view has no data", async () => {
    queryBuilder.order.mockResolvedValue(
      BOARD_SERVICE_EMPTY_RESULT
    );

    await expect(readBoardCategories()).resolves.toEqual(
      []
    );
  });
});
