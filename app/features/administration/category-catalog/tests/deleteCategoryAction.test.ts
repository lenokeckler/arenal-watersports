import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { deleteCategoryAction } from "../services/deleteCategoryAction";
import {
  CURRENT_IMAGE_PATH,
  STORAGE_ERROR,
} from "./CategoryImage.constants";
import {
  FAKE_ACTION_SUPABASE,
  mockAssertIsAdminWorker,
  mockDeleteEq,
  mockReadMaybeSingle,
  resetActionMocks,
} from "./CategoryImageActions.harness";
import {
  mockStorageFrom,
  mockStorageRemove,
} from "./CategoryImageStorage.harness";

const FAKE_CATEGORY_ID = "fake-category-id";

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (...args: unknown[]): unknown =>
      mockAssertIsAdminWorker(...args),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: () =>
    Promise.resolve(FAKE_ACTION_SUPABASE),
}));

describe("deleteCategoryAction", () => {
  beforeEach(() => {
    resetActionMocks();
    mockReadMaybeSingle.mockResolvedValue({
      data: { image_path: CURRENT_IMAGE_PATH },
      error: null,
    });
  });

  it("checks the caller is an admin before deleting", async () => {
    mockDeleteEq.mockResolvedValue({ error: null });

    await deleteCategoryAction(FAKE_CATEGORY_ID);

    expect(mockAssertIsAdminWorker).toHaveBeenCalledOnce();
  });

  it("propagates NotAuthorizedError without deleting when the caller is not an admin", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      deleteCategoryAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockDeleteEq).not.toHaveBeenCalled();
  });

  it("deletes the category by id and returns success", async () => {
    mockDeleteEq.mockResolvedValue({ error: null });

    const result = await deleteCategoryAction(
      FAKE_CATEGORY_ID
    );

    expect(mockDeleteEq).toHaveBeenCalledWith(
      "id",
      FAKE_CATEGORY_ID
    );
    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("returns the has-records error result when the database refuses the delete because records reference the category", async () => {
    mockDeleteEq.mockResolvedValue({
      error: {
        code: POSTGRES_ERROR_CODE.FOREIGN_KEY_VIOLATION,
        message:
          "update or delete on table violates foreign key constraint",
      },
    });

    const result = await deleteCategoryAction(
      FAKE_CATEGORY_ID
    );

    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.DELETE_HAS_RECORDS_ERROR,
    });
  });

  it("throws instead of returning success when the delete query itself fails", async () => {
    mockDeleteEq.mockResolvedValue({
      error: { code: "500", message: "boom" },
    });

    await expect(
      deleteCategoryAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });

  it("removes the stored image object after deleting the category", async () => {
    mockDeleteEq.mockResolvedValue({ error: null });

    await deleteCategoryAction(FAKE_CATEGORY_ID);

    expect(mockStorageRemove).toHaveBeenCalledWith([
      CURRENT_IMAGE_PATH,
    ]);
  });

  it("does not touch storage when the category has no image", async () => {
    mockReadMaybeSingle.mockResolvedValue({
      data: { image_path: null },
      error: null,
    });
    mockDeleteEq.mockResolvedValue({ error: null });

    await deleteCategoryAction(FAKE_CATEGORY_ID);

    expect(mockStorageFrom).not.toHaveBeenCalled();
  });

  it("does not touch storage when the category no longer exists", async () => {
    mockReadMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });
    mockDeleteEq.mockResolvedValue({ error: null });

    const result = await deleteCategoryAction(
      FAKE_CATEGORY_ID
    );

    expect(mockStorageFrom).not.toHaveBeenCalled();
    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("keeps the image object when the database refuses the delete", async () => {
    mockDeleteEq.mockResolvedValue({
      error: {
        code: POSTGRES_ERROR_CODE.FOREIGN_KEY_VIOLATION,
        message: "violates foreign key constraint",
      },
    });

    await deleteCategoryAction(FAKE_CATEGORY_ID);

    expect(mockStorageRemove).not.toHaveBeenCalled();
  });

  it("keeps the image object when the delete query itself fails", async () => {
    mockDeleteEq.mockResolvedValue({
      error: { code: "500", message: "boom" },
    });

    await expect(
      deleteCategoryAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
    expect(mockStorageRemove).not.toHaveBeenCalled();
  });

  it("returns success even when removing the image object fails", async () => {
    mockDeleteEq.mockResolvedValue({ error: null });
    mockStorageRemove.mockResolvedValue({
      data: null,
      error: STORAGE_ERROR,
    });

    const result = await deleteCategoryAction(
      FAKE_CATEGORY_ID
    );

    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("does not delete anything when reading the image path fails", async () => {
    mockReadMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      deleteCategoryAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
    expect(mockDeleteEq).not.toHaveBeenCalled();
  });
});
