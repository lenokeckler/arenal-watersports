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
import { removeCategoryImageAction } from "../services/removeCategoryImageAction";
import {
  ADMIN_WORKER_ID,
  CURRENT_IMAGE_PATH,
  IMAGE_CATEGORY_ID,
  NON_RECORD_INPUTS,
  STORAGE_ERROR,
} from "./CategoryImage.constants";
import {
  FAKE_ACTION_SUPABASE,
  mockAssertIsAdminWorker,
  mockReadMaybeSingle,
  mockUpdate,
  mockUpdateMaybeSingle,
  resetActionMocks,
} from "./CategoryImageActions.harness";
import { mockStorageRemove } from "./CategoryImageStorage.harness";

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

const NOT_A_UUID = "not-a-uuid";

describe("removeCategoryImageAction", () => {
  beforeEach(() => {
    resetActionMocks();
    mockReadMaybeSingle.mockResolvedValue({
      data: { image_path: CURRENT_IMAGE_PATH },
      error: null,
    });
    mockUpdateMaybeSingle.mockResolvedValue({
      data: { id: IMAGE_CATEGORY_ID },
      error: null,
    });
  });

  it("propagates NotAuthorizedError without updating anything", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      removeCategoryImageAction(IMAGE_CATEGORY_ID)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it.each([...NON_RECORD_INPUTS, NOT_A_UUID])(
    "rejects the invalid category id %j",
    async (input) => {
      expect(
        await removeCategoryImageAction(input)
      ).toEqual({
        status: CATEGORY_MUTATION_STATUS.ERROR,
        message: CATEGORY_IMAGE_COPY.INVALID_INPUT_ERROR,
      });
      expect(mockUpdate).not.toHaveBeenCalled();
    }
  );

  it("clears the path with the admin as updater and removes the object", async () => {
    const result = await removeCategoryImageAction(
      IMAGE_CATEGORY_ID
    );

    expect(mockUpdate).toHaveBeenCalledWith({
      image_path: null,
      updated_by: ADMIN_WORKER_ID,
    });
    expect(mockStorageRemove).toHaveBeenCalledWith([
      CURRENT_IMAGE_PATH,
    ]);
    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      hasLeftoverObject: false,
    });
  });

  it("succeeds without touching storage when the category had no image", async () => {
    mockReadMaybeSingle.mockResolvedValue({
      data: { image_path: null },
      error: null,
    });

    expect(
      await removeCategoryImageAction(IMAGE_CATEGORY_ID)
    ).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      hasLeftoverObject: false,
    });
    expect(mockStorageRemove).not.toHaveBeenCalled();
  });

  it("reports a leftover object when storage refuses the removal", async () => {
    mockStorageRemove.mockResolvedValue({
      data: null,
      error: STORAGE_ERROR,
    });

    expect(
      await removeCategoryImageAction(IMAGE_CATEGORY_ID)
    ).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      hasLeftoverObject: true,
    });
  });

  it.each([
    ["does not exist", mockReadMaybeSingle],
    ["vanishes before the update", mockUpdateMaybeSingle],
  ])(
    "reports not found when the category %s",
    async (_case, emptyQuery) => {
      emptyQuery.mockResolvedValue({
        data: null,
        error: null,
      });

      expect(
        await removeCategoryImageAction(IMAGE_CATEGORY_ID)
      ).toEqual({
        status: CATEGORY_MUTATION_STATUS.ERROR,
        message:
          CATEGORY_IMAGE_COPY.CATEGORY_NOT_FOUND_ERROR,
      });
      expect(mockStorageRemove).not.toHaveBeenCalled();
    }
  );

  it("throws and keeps the object when the update query fails", async () => {
    mockUpdateMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      removeCategoryImageAction(IMAGE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
    expect(mockStorageRemove).not.toHaveBeenCalled();
  });
});
