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
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { CategoryGroupConflictError } from "../services/assertCategoryGroupTrackingModeAvailable";
import { createCategoryAction } from "../services/createCategoryAction";

const FAKE_ADMIN_WORKER_ID = "fake-admin-worker-id";
const FAKE_CATEGORY_ID = "fake-category-id";
const FAKE_CATEGORY_NAME = "Kayak doble";
const FAKE_GROUP_NAME = "Kayaks";

const mockAssertIsAdminWorker = vi.fn();
const mockAssertCategoryGroupTrackingModeAvailable =
  vi.fn();
const mockInsert = vi.fn();
const mockSelect = vi.fn();
const mockSingle = vi.fn();

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
      insert: mockInsert,
    })),
  }),
}));

vi.mock(
  "../services/assertCategoryGroupTrackingModeAvailable",
  async () => {
    const actual = await vi.importActual<
      typeof import("../services/assertCategoryGroupTrackingModeAvailable")
    >(
      "../services/assertCategoryGroupTrackingModeAvailable"
    );
    return {
      ...actual,
      assertCategoryGroupTrackingModeAvailable: (
        ...args: unknown[]
      ): unknown =>
        mockAssertCategoryGroupTrackingModeAvailable(
          ...args
        ),
    };
  }
);

describe("createCategoryAction", () => {
  beforeEach(() => {
    mockAssertIsAdminWorker.mockReset();
    mockAssertCategoryGroupTrackingModeAvailable.mockReset();
    mockInsert.mockReset();
    mockSelect.mockReset();
    mockSingle.mockReset();

    mockInsert.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ single: mockSingle });
  });

  it("returns the required-name error without looking up the group or inserting when the trimmed name is empty", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );

    const result = await createCategoryAction({
      name: "   ",
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      groupName: FAKE_GROUP_NAME,
    });

    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      nameError:
        CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR,
    });
    expect(
      mockAssertCategoryGroupTrackingModeAvailable
    ).not.toHaveBeenCalled();
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("creates a category without a group and returns its id", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockSingle.mockResolvedValue({
      data: { id: FAKE_CATEGORY_ID },
      error: null,
    });

    const result = await createCategoryAction({
      name: FAKE_CATEGORY_NAME,
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      groupName: "",
    });

    expect(mockInsert).toHaveBeenCalledWith({
      name: FAKE_CATEGORY_NAME,
      tracking_mode: CATEGORY_TRACKING_MODE.BY_UNIT,
      group_name: null,
      created_by: FAKE_ADMIN_WORKER_ID,
      updated_by: FAKE_ADMIN_WORKER_ID,
    });
    expect(
      mockAssertCategoryGroupTrackingModeAvailable
    ).not.toHaveBeenCalled();
    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      categoryId: FAKE_CATEGORY_ID,
    });
  });

  it("creates a category whose group has no conflicting tracking mode", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockAssertCategoryGroupTrackingModeAvailable.mockResolvedValue(
      undefined
    );
    mockSingle.mockResolvedValue({
      data: { id: FAKE_CATEGORY_ID },
      error: null,
    });

    const result = await createCategoryAction({
      name: FAKE_CATEGORY_NAME,
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      groupName: FAKE_GROUP_NAME,
    });

    expect(
      mockAssertCategoryGroupTrackingModeAvailable
    ).toHaveBeenCalledWith(expect.anything(), {
      groupName: FAKE_GROUP_NAME,
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
    });
    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.SUCCESS,
      categoryId: FAKE_CATEGORY_ID,
    });
  });

  it("returns the direction-correct group conflict error without inserting when the group mixes tracking modes", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockAssertCategoryGroupTrackingModeAvailable.mockRejectedValue(
      new CategoryGroupConflictError(
        CATEGORY_TRACKING_MODE.BY_QUANTITY
      )
    );

    const result = await createCategoryAction({
      name: FAKE_CATEGORY_NAME,
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      groupName: FAKE_GROUP_NAME,
    });

    expect(result).toEqual({
      status: CATEGORY_MUTATION_STATUS.ERROR,
      groupNameError:
        "Este grupo ya tiene categorías por cantidad; esta es por unidad.",
    });
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("propagates NotAuthorizedError instead of returning a result when the caller is not an admin", async () => {
    mockAssertIsAdminWorker.mockRejectedValue(
      new NotAuthorizedError()
    );

    await expect(
      createCategoryAction({
        name: FAKE_CATEGORY_NAME,
        trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
        groupName: "",
      })
    ).rejects.toThrow(NotAuthorizedError);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("propagates the insert error instead of returning a success result", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      createCategoryAction({
        name: FAKE_CATEGORY_NAME,
        trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
        groupName: "",
      })
    ).rejects.toThrow(SupabaseQueryError);
  });

  it("treats a whitespace-only group name as no group", async () => {
    mockAssertIsAdminWorker.mockResolvedValue(
      FAKE_ADMIN_WORKER_ID
    );
    mockSingle.mockResolvedValue({
      data: { id: FAKE_CATEGORY_ID },
      error: null,
    });

    await createCategoryAction({
      name: FAKE_CATEGORY_NAME,
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
      groupName: "   ",
    });

    expect(
      mockAssertCategoryGroupTrackingModeAvailable
    ).not.toHaveBeenCalled();
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({ group_name: null })
    );
  });
});
