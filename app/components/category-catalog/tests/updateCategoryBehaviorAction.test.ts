import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { updateCategoryBehaviorAction } from "../services/updateCategoryBehaviorAction";
import { mapUpdateCategoryBehaviorInputToRow } from "../utils/mapUpdateCategoryBehaviorInputToRow";
import {
  DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
  FAKE_UPDATE_ADMIN_WORKER_ID,
  FAKE_UPDATE_CATEGORY_ID,
} from "./UpdateCategoryBehaviorInput.constants";

const CHECK_VIOLATION_CODE = "23514";
const TRACKING_MODE_COLUMN = "tracking_mode";

const mockAssertIsAdminWorker = vi.fn();
const mockMaybeSingle = vi.fn();
const mockSelect = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockUpdateEq = vi.fn(() => ({ select: mockSelect }));
const mockUpdate = vi.fn(() => ({ eq: mockUpdateEq }));

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (...args: unknown[]): unknown =>
      mockAssertIsAdminWorker(...args),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: vi.fn(() => ({ update: mockUpdate })),
  }),
}));

describe("updateCategoryBehaviorAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockUpdate.mockClear();
    mockUpdateEq.mockClear();
    mockSelect.mockClear();
    mockMaybeSingle.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_UPDATE_ADMIN_WORKER_ID
    );
    mockMaybeSingle.mockResolvedValue({
      data: { id: FAKE_UPDATE_CATEGORY_ID },
      error: null,
    });
  });

  it("checks the caller is an admin before updating the behavior", async () => {
    await updateCategoryBehaviorAction(
      DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT
    );

    expect(mockAssertIsAdminWorker).toHaveBeenCalledOnce();
  });

  it("propagates NotAuthorizedError without updating when the caller is not an admin", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      updateCategoryBehaviorAction(
        DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT
      )
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("sends the mapped payload without tracking_mode, filtered by category id", async () => {
    await updateCategoryBehaviorAction(
      DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT
    );

    expect(mockUpdate).toHaveBeenCalledWith(
      mapUpdateCategoryBehaviorInputToRow(
        DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
        FAKE_UPDATE_ADMIN_WORKER_ID
      )
    );
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.not.objectContaining({
        [TRACKING_MODE_COLUMN]: expect.anything(),
      })
    );
    expect(mockUpdateEq).toHaveBeenCalledWith(
      "id",
      DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT.categoryId
    );
  });

  it("returns success when the update matched a row", async () => {
    const result = await updateCategoryBehaviorAction(
      DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT
    );

    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("returns the not-found error when the update matched no row", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    const result = await updateCategoryBehaviorAction(
      DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT
    );

    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.BEHAVIOR_CATEGORY_NOT_FOUND_ERROR,
    });
  });

  it("throws instead of returning an error result when the database rejects the update", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: CHECK_VIOLATION_CODE,
        message: "boom",
      },
    });

    await expect(
      updateCategoryBehaviorAction(
        DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT
      )
    ).rejects.toThrow(SupabaseQueryError);
  });
});
