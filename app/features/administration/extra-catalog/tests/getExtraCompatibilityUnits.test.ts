import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getExtraCompatibilityUnits } from "../services/getExtraCompatibilityUnits";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_CATEGORY_NAME,
  COMPATIBILITY_CATEGORY_ROW,
  COMPATIBILITY_EXTRA,
  COMPATIBILITY_EXTRA_ID,
  FREE_UNIT_ROW,
  LINKED_UNIT_ID,
  LINKED_UNIT_ROW,
} from "./ExtraCompatibility.constants";

const mockFetchExtra = vi.fn();
const mockFetchCategory = vi.fn();
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
  "../services/fetchExtraCompatibilityCategory",
  () => ({
    fetchExtraCompatibilityCategory: (
      ...args: unknown[]
    ): unknown => mockFetchCategory(...args),
  })
);

vi.mock("../services/fetchExtraLinkedUnitIds", () => ({
  fetchExtraLinkedUnitIds: (...args: unknown[]): unknown =>
    mockFetchLinkedUnitIds(...args),
}));

describe("getExtraCompatibilityUnits", () => {
  beforeEach(() => {
    mockFetchExtra.mockReset();
    mockFetchCategory.mockReset();
    mockFetchLinkedUnitIds.mockReset();
    mockFetchExtra.mockResolvedValue(COMPATIBILITY_EXTRA);
    mockFetchCategory.mockResolvedValue(
      COMPATIBILITY_CATEGORY_ROW
    );
    mockFetchLinkedUnitIds.mockResolvedValue([
      LINKED_UNIT_ID,
    ]);
  });

  it("returns the extra, the category and its units with the linked ones marked", async () => {
    expect(
      await getExtraCompatibilityUnits(
        COMPATIBILITY_EXTRA_ID,
        COMPATIBILITY_CATEGORY_ID
      )
    ).toEqual({
      extra: COMPATIBILITY_EXTRA,
      category: {
        id: COMPATIBILITY_CATEGORY_ID,
        name: COMPATIBILITY_CATEGORY_NAME,
      },
      units: [
        { ...LINKED_UNIT_ROW, isLinked: true },
        { ...FREE_UNIT_ROW, isLinked: false },
      ],
    });
  });

  it.each([
    ["extra", mockFetchExtra],
    ["category", mockFetchCategory],
  ])(
    "returns null when the %s is not found",
    async (_missing, fetchMock) => {
      fetchMock.mockResolvedValue(null);

      expect(
        await getExtraCompatibilityUnits(
          COMPATIBILITY_EXTRA_ID,
          COMPATIBILITY_CATEGORY_ID
        )
      ).toBeNull();
      expect(mockFetchLinkedUnitIds).not.toHaveBeenCalled();
    }
  );
});
