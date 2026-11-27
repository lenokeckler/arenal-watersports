import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  INVENTORY_TRACKING_MODE,
  POSTGRES_ERROR_CODE,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import { getOccupiableCategories } from "../services/getOccupiableCategories";
import {
  FAKE_OCCUPIED_CATEGORY_ID,
  FAKE_OCCUPIED_CATEGORY_NAME,
} from "./Extra.constants";
import { buildQueryClient } from "./extraOccupancyQueries.harness";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const CATEGORY_ROWS = [
  {
    id: FAKE_OCCUPIED_CATEGORY_ID,
    name: FAKE_OCCUPIED_CATEGORY_NAME,
  },
];

describe("getOccupiableCategories", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("lists the active categories counted by quantity", async () => {
    const { client, calls } = buildQueryClient({
      data: CATEGORY_ROWS,
      error: null,
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      client
    );

    expect(await getOccupiableCategories()).toEqual(
      CATEGORY_ROWS
    );
    expect(calls.eq).toEqual([
      [
        "tracking_mode",
        INVENTORY_TRACKING_MODE.BY_QUANTITY,
      ],
      ["status", EXTRA_STATUS.ACTIVE],
    ]);
  });

  it("is empty when no category matches", async () => {
    const { client } = buildQueryClient({
      data: null,
      error: null,
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      client
    );

    expect(await getOccupiableCategories()).toEqual([]);
  });

  it("throws when the query fails", async () => {
    const { client } = buildQueryClient({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.RAISE_EXCEPTION,
        message: "boom",
      },
    });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      client
    );

    await expect(getOccupiableCategories()).rejects.toThrow(
      SupabaseQueryError
    );
  });
});
