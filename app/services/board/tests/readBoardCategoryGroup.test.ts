import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { BOARD_CATEGORY_QUERY } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readBoardCategoryGroup } from "../readBoardCategoryGroup";
import {
  BOARD_SERVICE_REDIRECT_SIGNAL,
  BOARD_SERVICE_USER,
} from "./BoardCategories.constants";
import {
  BLANK_GROUP_ROW,
  EXPECTED_KAYAK_MEMBERS,
  GROUP_BOARD_ROWS,
  GROUP_CATEGORY_ID,
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

describe("readBoardCategoryGroup", () => {
  beforeEach(resetMocks);

  it("returns every member of the group, by name, from the board view", async () => {
    const members = await readBoardCategoryGroup(
      GROUP_CATEGORY_ID.KAYAK_INDIVIDUAL
    );

    expect(from).toHaveBeenCalledWith(
      BOARD_CATEGORY_QUERY.VIEW
    );
    expect(members).toEqual(EXPECTED_KAYAK_MEMBERS);
  });

  it("returns the same members from any of them", async () => {
    const fromDouble = await readBoardCategoryGroup(
      GROUP_CATEGORY_ID.KAYAK_DOUBLE
    );
    const fromTriple = await readBoardCategoryGroup(
      GROUP_CATEGORY_ID.KAYAK_TRIPLE
    );

    expect(fromDouble).toEqual(EXPECTED_KAYAK_MEMBERS);
    expect(fromTriple).toEqual(EXPECTED_KAYAK_MEMBERS);
  });

  it("treats group names that differ only by case as one group", async () => {
    const members = await readBoardCategoryGroup(
      GROUP_CATEGORY_ID.KAYAK_TRIPLE
    );

    expect(members).toHaveLength(
      EXPECTED_KAYAK_MEMBERS.length
    );
  });

  it("returns no members for a category without a group", async () => {
    await expect(
      readBoardCategoryGroup(GROUP_CATEGORY_ID.TOUR)
    ).resolves.toEqual([]);
  });

  it("returns no members for a blank group name", async () => {
    queryBuilder.order.mockResolvedValue({
      data: [BLANK_GROUP_ROW],
      error: null,
    });

    await expect(
      readBoardCategoryGroup(GROUP_CATEGORY_ID.TOUR)
    ).resolves.toEqual([]);
  });
});
