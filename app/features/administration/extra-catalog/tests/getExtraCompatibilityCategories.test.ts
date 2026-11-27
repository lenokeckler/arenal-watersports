import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getExtraCompatibilityCategories } from "../services/getExtraCompatibilityCategories";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_CATEGORY_NAME,
  COMPATIBILITY_CATEGORY_ROW,
  COMPATIBILITY_EXTRA,
  COMPATIBILITY_EXTRA_ID,
  LINKED_UNIT_ID,
} from "./ExtraCompatibility.constants";

const mockFetchExtra = vi.fn();
const mockFetchCategories = vi.fn();
const mockFetchLinkedUnitIds = vi.fn();

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({}),
}));

vi.mock("../services/fetchExtraCompatibilityExtra", () => ({
  fetchExtraCompatibilityExtra: (
    ...args: unknown[]
  ): unknown => mockFetchExtra(...args),
}));

vi.mock(
  "../services/fetchExtraCompatibilityCategories",
  () => ({
    fetchExtraCompatibilityCategories: (
      ...args: unknown[]
    ): unknown => mockFetchCategories(...args),
  })
);

vi.mock("../services/fetchExtraLinkedUnitIds", () => ({
  fetchExtraLinkedUnitIds: (...args: unknown[]): unknown =>
    mockFetchLinkedUnitIds(...args),
}));

describe("getExtraCompatibilityCategories", () => {
  beforeEach(() => {
    mockFetchExtra.mockReset();
    mockFetchCategories.mockReset();
    mockFetchLinkedUnitIds.mockReset();
    mockFetchExtra.mockResolvedValue(COMPATIBILITY_EXTRA);
    mockFetchCategories.mockResolvedValue([
      COMPATIBILITY_CATEGORY_ROW,
    ]);
    mockFetchLinkedUnitIds.mockResolvedValue([
      LINKED_UNIT_ID,
    ]);
  });

  it("returns the extra with its categories and how many units are linked", async () => {
    expect(
      await getExtraCompatibilityCategories(
        COMPATIBILITY_EXTRA_ID
      )
    ).toEqual({
      extra: COMPATIBILITY_EXTRA,
      categories: [
        {
          id: COMPATIBILITY_CATEGORY_ID,
          name: COMPATIBILITY_CATEGORY_NAME,
          unitCount: 2,
          linkedUnitCount: 1,
        },
      ],
    });
  });

  it("returns null without reading categories when the extra does not exist", async () => {
    mockFetchExtra.mockResolvedValue(null);

    expect(
      await getExtraCompatibilityCategories(
        COMPATIBILITY_EXTRA_ID
      )
    ).toBeNull();
    expect(mockFetchCategories).not.toHaveBeenCalled();
  });

  it("rejects when a read fails instead of returning a partial result", async () => {
    mockFetchCategories.mockRejectedValue(
      new Error("read failed")
    );

    await expect(
      getExtraCompatibilityCategories(
        COMPATIBILITY_EXTRA_ID
      )
    ).rejects.toThrow("read failed");
  });
});
