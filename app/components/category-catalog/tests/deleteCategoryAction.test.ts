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
import { CategoryHasRecordsError } from "../services/assertCategoryHasNoRecords";
import { deleteCategoryAction } from "../services/deleteCategoryAction";

const FAKE_CATEGORY_ID = "fake-category-id";
const FAKE_ADMIN_WORKER_ID = "fake-admin-worker-id";

const mockAssertIsAdminWorker = vi.fn();
const mockAssertCategoryHasNoRecords = vi.fn();
const mockDeleteEq = vi.fn();

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (...args: unknown[]): unknown =>
      mockAssertIsAdminWorker(...args),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi
    .fn()
    .mockResolvedValue({ sessionClient: true }),
  createServiceRoleSupabaseClient: vi.fn(() => ({
    from: vi.fn(() => ({
      delete: vi.fn(() => ({ eq: mockDeleteEq })),
    })),
  })),
}));

vi.mock(
  "../services/assertCategoryHasNoRecords",
  async () => {
    const actual = await vi.importActual<
      typeof import("../services/assertCategoryHasNoRecords")
    >("../services/assertCategoryHasNoRecords");
    return {
      ...actual,
      assertCategoryHasNoRecords: (
        ...args: unknown[]
      ): unknown => mockAssertCategoryHasNoRecords(...args),
    };
  }
);

describe("deleteCategoryAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockAssertCategoryHasNoRecords.mockReset();
    mockDeleteEq.mockReset();
  });

  it("checks the caller is an admin before touching the service-role client", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockAssertCategoryHasNoRecords.mockResolvedValue(
      undefined
    );
    mockDeleteEq.mockResolvedValue({ error: null });

    await deleteCategoryAction(FAKE_CATEGORY_ID);

    expect(mockAssertIsAdminWorker).toHaveBeenCalledOnce();
  });

  it("propagates NotAuthorizedError instead of returning an error result when the caller is not an admin", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      deleteCategoryAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(NotAuthorizedError);
    expect(
      mockAssertCategoryHasNoRecords
    ).not.toHaveBeenCalled();
  });

  it("returns the has-records error result without deleting when the category still has records", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockAssertCategoryHasNoRecords.mockRejectedValue(
      new CategoryHasRecordsError()
    );

    const result = await deleteCategoryAction(
      FAKE_CATEGORY_ID
    );

    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      message:
        CATEGORY_CATALOG_COPY.DELETE_HAS_RECORDS_ERROR,
    });
    expect(mockDeleteEq).not.toHaveBeenCalled();
  });

  it("propagates an unrelated error instead of returning the has-records message", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockAssertCategoryHasNoRecords.mockRejectedValue(
      new SupabaseQueryError("boom", {
        code: "500",
        message: "boom",
      } as never)
    );

    await expect(
      deleteCategoryAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
    expect(mockDeleteEq).not.toHaveBeenCalled();
  });

  it("deletes the category and returns success once it is verified to have no records", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockAssertCategoryHasNoRecords.mockResolvedValue(
      undefined
    );
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

  it("returns the has-records error result when a record is inserted between the check and the delete", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockAssertCategoryHasNoRecords.mockResolvedValue(
      undefined
    );
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
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockAssertCategoryHasNoRecords.mockResolvedValue(
      undefined
    );
    mockDeleteEq.mockResolvedValue({
      error: { code: "500", message: "boom" },
    });

    await expect(
      deleteCategoryAction(FAKE_CATEGORY_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
