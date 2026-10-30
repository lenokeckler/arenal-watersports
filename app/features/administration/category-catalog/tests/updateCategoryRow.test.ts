import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { NotAuthorizedError } from "@/app/services/authorization/NotAuthorizedError";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { updateCategoryRow } from "../services/updateCategoryRow";

const ADMIN_ID = "admin-worker-id";
const CATEGORY_ID = "category-id";
const OPERATION = "updateCategoryRowTest";
const ROW = { deposit_usd: 1 };

const mockAssertIsAdminWorker = vi.fn();
const mockMaybeSingle = vi.fn();
const mockEq = vi.fn(() => ({
  select: () => ({ maybeSingle: mockMaybeSingle }),
}));
const mockUpdate = vi.fn((_row: object) => ({
  eq: mockEq,
}));

vi.mock(
  "@/app/services/authorization/assertIsAdminWorker",
  () => ({
    assertIsAdminWorker: (): unknown =>
      mockAssertIsAdminWorker(),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: vi.fn(() => ({ update: mockUpdate })),
  }),
}));

const run = () =>
  updateCategoryRow({
    categoryId: CATEGORY_ID,
    buildRow: (adminWorkerId) => ({
      ...ROW,
      updated_by: adminWorkerId,
    }),
    operation: OPERATION,
  });

describe("updateCategoryRow", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockUpdate.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
    mockAssertIsAdminWorker.mockResolvedValue(ADMIN_ID);
    mockMaybeSingle.mockResolvedValue({
      data: { id: CATEGORY_ID },
      error: null,
    });
  });

  it("rejects a caller who is not an admin before any update", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(run()).rejects.toThrow(NotAuthorizedError);
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("writes the built row with the admin id to the given category", async () => {
    await expect(run()).resolves.toBe(true);

    expect(mockUpdate).toHaveBeenCalledWith({
      ...ROW,
      updated_by: ADMIN_ID,
    });
    expect(mockEq).toHaveBeenCalledWith("id", CATEGORY_ID);
  });

  it("is false when no row matched", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(run()).resolves.toBe(false);
  });

  it("throws a database error", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "XX000" },
    });

    await expect(run()).rejects.toThrow(SupabaseQueryError);
  });
});
