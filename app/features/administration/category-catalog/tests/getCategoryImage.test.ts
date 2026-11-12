import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { resolveCategoryImageUrl } from "@/app/utils/category-image/resolveCategoryImageUrl";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getCategoryImage } from "../services/getCategoryImage";
import {
  buildCategoryImageRow,
  CURRENT_IMAGE_PATH,
  IMAGE_CATEGORY_ID,
} from "./CategoryImage.constants";

const CATEGORIES_TABLE = "equipment_categories";
const ID_COLUMN = "id";
const IMAGE_SELECTION = "id, name, image_path";

const mockMaybeSingle = vi.fn();
const mockEq = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockSelect = vi.fn((_columns: string) => ({
  eq: mockEq,
}));
const mockFrom = vi.fn((_table: string) => ({
  select: mockSelect,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: (table: string) => mockFrom(table),
  }),
}));

describe("getCategoryImage", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockSelect.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("selects only the image columns of the category with the given id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: buildCategoryImageRow(),
      error: null,
    });

    await getCategoryImage(IMAGE_CATEGORY_ID);

    expect(mockFrom).toHaveBeenCalledWith(CATEGORIES_TABLE);
    expect(mockSelect).toHaveBeenCalledWith(
      IMAGE_SELECTION
    );
    expect(mockEq).toHaveBeenCalledWith(
      ID_COLUMN,
      IMAGE_CATEGORY_ID
    );
  });

  it("returns the row mapped to an image with its public url", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: buildCategoryImageRow(),
      error: null,
    });

    expect(
      await getCategoryImage(IMAGE_CATEGORY_ID)
    ).toEqual({
      categoryId: IMAGE_CATEGORY_ID,
      categoryName: buildCategoryImageRow().name,
      imagePath: CURRENT_IMAGE_PATH,
      imageUrl: resolveCategoryImageUrl(CURRENT_IMAGE_PATH),
    });
  });

  it("returns a null path and url for a category without image", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: buildCategoryImageRow({ image_path: null }),
      error: null,
    });

    const image = await getCategoryImage(IMAGE_CATEGORY_ID);

    expect(image?.imagePath).toBeNull();
    expect(image?.imageUrl).toBeNull();
  });

  it("returns null when no category matches the id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await getCategoryImage(IMAGE_CATEGORY_ID)
    ).toBeNull();
  });

  it("returns null when the id is not a valid uuid", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        message: "invalid input syntax for type uuid",
      },
    });

    expect(
      await getCategoryImage(IMAGE_CATEGORY_ID)
    ).toBeNull();
  });

  it("throws instead of returning null when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      getCategoryImage(IMAGE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
