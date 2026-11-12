import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_IMAGE_COPY } from "../constants/CategoryImageCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { setCategoryImageAction } from "../services/setCategoryImageAction";
import {
  ADMIN_WORKER_ID,
  CURRENT_IMAGE_PATH,
  IMAGE_CATEGORY_ID,
  INVALID_SET_INPUTS,
  NEW_IMAGE_PATH,
  OBJECT_SIZE_ABOVE_MAX_BYTES,
  STORAGE_ERROR,
  VALID_OBJECT_INFO,
  VALID_SET_INPUT,
} from "./CategoryImage.constants";
import {
  FAKE_ACTION_SUPABASE,
  mockAssertIsAdminWorker,
  mockReadMaybeSingle,
  mockUpdate,
  mockUpdateEq,
  mockUpdateMaybeSingle,
  resetActionMocks,
} from "./CategoryImageActions.harness";
import {
  mockStorageInfo,
  mockStorageRemove,
} from "./CategoryImageStorage.harness";

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

const ID_COLUMN = "id";

const expectError = (
  result: Awaited<
    ReturnType<typeof setCategoryImageAction>
  >,
  message: string
): void => {
  expect(result).toEqual({
    status: CATEGORY_MUTATION_STATUS.ERROR,
    message,
  });
};

describe("setCategoryImageAction", () => {
  beforeEach(() => {
    resetActionMocks();
    mockStorageInfo.mockResolvedValue({
      data: VALID_OBJECT_INFO,
      error: null,
    });
    mockReadMaybeSingle.mockResolvedValue({
      data: { image_path: CURRENT_IMAGE_PATH },
      error: null,
    });
    mockUpdateMaybeSingle.mockResolvedValue({
      data: { id: IMAGE_CATEGORY_ID },
      error: null,
    });
  });

  it("propagates NotAuthorizedError without reading the input or touching storage", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      setCategoryImageAction(VALID_SET_INPUT)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockStorageInfo).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it.each(INVALID_SET_INPUTS)(
    "rejects the malformed input %j without touching storage",
    async (input) => {
      expectError(
        await setCategoryImageAction(input),
        CATEGORY_IMAGE_COPY.INVALID_INPUT_ERROR
      );
      expect(mockStorageInfo).not.toHaveBeenCalled();
    }
  );

  it("rejects an object that is not in storage without updating the category", async () => {
    mockStorageInfo.mockResolvedValue({
      data: null,
      error: STORAGE_ERROR,
    });

    expectError(
      await setCategoryImageAction(VALID_SET_INPUT),
      CATEGORY_IMAGE_COPY.OBJECT_MISSING_ERROR
    );
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("removes an object above the size limit and does not update the category", async () => {
    mockStorageInfo.mockResolvedValue({
      data: {
        ...VALID_OBJECT_INFO,
        size: OBJECT_SIZE_ABOVE_MAX_BYTES,
      },
      error: null,
    });

    expectError(
      await setCategoryImageAction(VALID_SET_INPUT),
      CATEGORY_IMAGE_COPY.OBJECT_INVALID_ERROR
    );
    expect(mockStorageRemove).toHaveBeenCalledWith([
      NEW_IMAGE_PATH,
    ]);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("links the new path with the admin as updater and removes the previous object", async () => {
    const result =
      await setCategoryImageAction(VALID_SET_INPUT);

    expect(mockUpdate).toHaveBeenCalledWith({
      image_path: NEW_IMAGE_PATH,
      updated_by: ADMIN_WORKER_ID,
    });
    expect(mockUpdateEq).toHaveBeenCalledWith(
      ID_COLUMN,
      IMAGE_CATEGORY_ID
    );
    expect(mockStorageRemove).toHaveBeenCalledWith([
      CURRENT_IMAGE_PATH,
    ]);
    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      hasLeftoverObject: false,
    });
  });

  it("removes nothing when the category had no image before", async () => {
    mockReadMaybeSingle.mockResolvedValue({
      data: { image_path: null },
      error: null,
    });

    const result =
      await setCategoryImageAction(VALID_SET_INPUT);

    expect(mockStorageRemove).not.toHaveBeenCalled();
    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      hasLeftoverObject: false,
    });
  });

  it("does not remove the object when the category already points at it", async () => {
    mockReadMaybeSingle.mockResolvedValue({
      data: { image_path: NEW_IMAGE_PATH },
      error: null,
    });

    await setCategoryImageAction(VALID_SET_INPUT);

    expect(mockStorageRemove).not.toHaveBeenCalled();
  });

  it("reports a leftover object when the previous object cannot be removed", async () => {
    mockStorageRemove.mockResolvedValue({
      data: null,
      error: STORAGE_ERROR,
    });

    expect(
      await setCategoryImageAction(VALID_SET_INPUT)
    ).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      hasLeftoverObject: true,
    });
  });

  it("removes the new object and reports not found when the category does not exist", async () => {
    mockReadMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expectError(
      await setCategoryImageAction(VALID_SET_INPUT),
      CATEGORY_IMAGE_COPY.CATEGORY_NOT_FOUND_ERROR
    );
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockStorageRemove).toHaveBeenCalledWith([
      NEW_IMAGE_PATH,
    ]);
  });

  it("removes the new object and reports not found when the category vanishes before the update", async () => {
    mockUpdateMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expectError(
      await setCategoryImageAction(VALID_SET_INPUT),
      CATEGORY_IMAGE_COPY.CATEGORY_NOT_FOUND_ERROR
    );
    expect(mockStorageRemove).toHaveBeenCalledWith([
      NEW_IMAGE_PATH,
    ]);
    expect(mockStorageRemove).not.toHaveBeenCalledWith([
      CURRENT_IMAGE_PATH,
    ]);
  });

  it("throws and keeps the previous object when the update query fails", async () => {
    mockUpdateMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      setCategoryImageAction(VALID_SET_INPUT)
    ).rejects.toThrow(SupabaseQueryError);
    expect(mockStorageRemove).not.toHaveBeenCalled();
  });
});
