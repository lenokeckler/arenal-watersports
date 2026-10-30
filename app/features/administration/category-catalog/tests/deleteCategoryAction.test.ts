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

const FAKE_CATEGORY_ID = "fake-category-id";
const FAKE_ADMIN_WORKER_ID = "fake-admin-worker-id";

const mockAssertIsAdminWorker = vi.fn();
const mockDeleteEq = vi.fn();

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (...args: unknown[]): unknown =>
      mockAssertIsAdminWorker(...args),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: vi.fn(() => ({
      delete: vi.fn(() => ({ eq: mockDeleteEq })),
    })),
  }),
}));

describe("deleteCategoryAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockDeleteEq.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
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
});
