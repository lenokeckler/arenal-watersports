import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { reactivateCategoryAction } from "../services/reactivateCategoryAction";

const FAKE_CATEGORY_ID = "fake-category-id";
const FAKE_ADMIN_WORKER_ID = "fake-admin-worker-id";

const mockAssertIsAdminWorker = vi.fn();
const mockUpdateStatusEq = vi.fn();
const mockUpdateEq = vi.fn(() => ({
  eq: mockUpdateStatusEq,
}));
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

describe("reactivateCategoryAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockUpdate.mockClear();
    mockUpdateEq.mockClear();
    mockUpdateStatusEq.mockReset();
  });

  it("propagates NotAuthorizedError instead of returning an error result when the caller is not an admin", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      reactivateCategoryAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("updates the category status back to active stamped with the caller's worker id", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockUpdateStatusEq.mockResolvedValue({ error: null });

    await reactivateCategoryAction(FAKE_CATEGORY_ID);

    expect(mockUpdate).toHaveBeenCalledWith({
      status: CATEGORY_STATUS.ACTIVE,
      updated_by: FAKE_ADMIN_WORKER_ID,
    });
    expect(mockUpdateEq).toHaveBeenCalledWith(
      "id",
      FAKE_CATEGORY_ID
    );
    expect(mockUpdateStatusEq).toHaveBeenCalledWith(
      "status",
      CATEGORY_STATUS.INACTIVE
    );
  });

  it("returns success once the update resolves without error", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockUpdateStatusEq.mockResolvedValue({ error: null });

    const result = await reactivateCategoryAction(
      FAKE_CATEGORY_ID
    );

    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
    });
  });

  it("throws instead of returning an error result when the update query fails", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockUpdateStatusEq.mockResolvedValue({
      error: { code: "500", message: "boom" },
    });

    await expect(
      reactivateCategoryAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
