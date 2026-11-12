import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  BOARD_CATEGORY_OPERATION,
  PATHS,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readBoardCategoryGroup } from "../readBoardCategoryGroup";
import {
  BOARD_SERVICE_POSTGREST_ERROR,
  BOARD_SERVICE_REDIRECT_SIGNAL,
  BOARD_SERVICE_USER,
} from "./BoardCategories.constants";
import {
  GROUP_BOARD_ROWS,
  GROUP_CATEGORY_ID,
  GROUP_INVALID_CATEGORY_ID,
  GROUP_UNKNOWN_CATEGORY_ID,
  PADDLE_BOARD_ROW,
} from "./BoardCategoryGroup.constants";

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
  queryBuilder.order.mockResolvedValue({
    data: GROUP_BOARD_ROWS,
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

describe("readBoardCategoryGroup edge cases and failures", () => {
  beforeEach(resetMocks);

  it("returns only the category itself when it is alone in its group", async () => {
    const members = await readBoardCategoryGroup(
      GROUP_CATEGORY_ID.PADDLE_BOARD
    );

    expect(members).toEqual([
      {
        id: GROUP_CATEGORY_ID.PADDLE_BOARD,
        name: PADDLE_BOARD_ROW.category_name,
      },
    ]);
  });

  it("returns no members when the category is not on the board", async () => {
    await expect(
      readBoardCategoryGroup(GROUP_UNKNOWN_CATEGORY_ID)
    ).resolves.toEqual([]);
  });

  it("returns no members for an invalid id without querying", async () => {
    await expect(
      readBoardCategoryGroup(GROUP_INVALID_CATEGORY_ID)
    ).resolves.toEqual([]);

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
      readBoardCategoryGroup(GROUP_CATEGORY_ID.KAYAK_DOUBLE)
    ).rejects.toThrow(redirectSignal);

    expect(supabaseMocks.redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.LOGIN
    );
  });

  it("throws the query error instead of an empty group", async () => {
    queryBuilder.order.mockResolvedValue({
      data: null,
      error: BOARD_SERVICE_POSTGREST_ERROR,
    });

    await expect(
      readBoardCategoryGroup(GROUP_CATEGORY_ID.KAYAK_DOUBLE)
    ).rejects.toThrow(BOARD_CATEGORY_OPERATION);
  });
});
