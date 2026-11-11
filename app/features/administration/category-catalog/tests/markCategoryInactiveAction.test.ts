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
import { markCategoryInactiveAction } from "../services/markCategoryInactiveAction";

const FAKE_CATEGORY_ID = "fake-category-id";
const FAKE_ADMIN_WORKER_ID = "fake-admin-worker-id";

const mockAssertIsAdminWorker = vi.fn();
const mockUpdateEq = vi.fn();
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

describe("markCategoryInactiveAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockUpdate.mockClear();
    mockUpdateEq.mockReset();
  });

  it("checks the caller is an admin before updating the category", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockUpdateEq.mockResolvedValue({ error: null });

    await markCategoryInactiveAction(FAKE_CATEGORY_ID);

    expect(mockAssertIsAdminWorker).toHaveBeenCalledOnce();
  });

  it("propagates NotAuthorizedError instead of returning an error result when the caller is not an admin", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      markCategoryInactiveAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("updates the category status to inactive stamped with the caller's worker id", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockUpdateEq.mockResolvedValue({ error: null });

    await markCategoryInactiveAction(FAKE_CATEGORY_ID);

    expect(mockUpdate).toHaveBeenCalledWith({
      status: CATEGORY_STATUS.INACTIVE,
      updated_by: FAKE_ADMIN_WORKER_ID,
    });
    expect(mockUpdateEq).toHaveBeenCalledWith(
      "id",
      FAKE_CATEGORY_ID
    );
  });

  it("returns success once the update resolves without error", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockUpdateEq.mockResolvedValue({ error: null });

    const result = await markCategoryInactiveAction(
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
    mockUpdateEq.mockResolvedValue({
      error: { code: "500", message: "boom" },
    });

    await expect(
      markCategoryInactiveAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
