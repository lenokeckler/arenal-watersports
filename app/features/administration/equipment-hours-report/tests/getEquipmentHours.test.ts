import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import {
  EquipmentHoursAccessError,
  getEquipmentHours,
} from "../services/getEquipmentHours";
import { EQUIPMENT_HOURS_TEST } from "./EquipmentHours.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));
vi.mock("@/app/services/worker-registration", () => ({
  isAdministratorSignedIn: vi.fn(),
}));

const limit = vi.fn();
const inFilter = vi.fn(() => ({ limit }));
const range = vi.fn();
const order = vi.fn(() => ({ range }));
const eqTracking = vi.fn(() => ({ order }));
const eqStatus = vi.fn(() => ({ eq: eqTracking }));
const select = vi.fn((columns: string) =>
  columns === "id" ? { eq: eqStatus } : { in: inFilter }
);
const from = vi.fn(() => ({ select }));

const CATEGORY_PAGE = {
  count: 7,
  data: [{ id: "c1" }],
  error: null,
};

describe("getEquipmentHours", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      true
    );
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        from,
      } as never
    );
    range.mockResolvedValue(CATEGORY_PAGE);
  });

  it("reads the page of categories, then their usage, and groups it", async () => {
    limit.mockResolvedValue({
      data: [
        {
          category_id: "c1",
          category_name: "Jet Ski",
          dispatch_count: 2,
          hours_used: "3.50",
          last_dispatched_at: "2026-11-01T10:00:00+00:00",
          unit_code: "JET-01",
          unit_id: "u1",
        },
        {
          category_id: null,
          category_name: "x",
          dispatch_count: 0,
          hours_used: 0,
          last_dispatched_at: null,
          unit_code: "X",
          unit_id: "u2",
        },
      ],
      error: null,
    });

    expect(await getEquipmentHours(2)).toEqual({
      categories: [
        {
          categoryId: "c1",
          name: "Jet Ski",
          units: [
            {
              code: "JET-01",
              dispatchCount: 2,
              hours: 3.5,
              lastDispatchedAt: "2026-11-01T10:00:00+00:00",
              unitId: "u1",
            },
          ],
        },
      ],
      pageCount: 3,
    });
    expect(range).toHaveBeenCalledWith(3, 5);
    expect(inFilter).toHaveBeenCalledWith("category_id", [
      "c1",
    ]);
    expect(from).toHaveBeenCalledWith(
      "equipment_usage_hours"
    );
  });

  it("does not read the usage when the page has no categories", async () => {
    range.mockResolvedValue({
      count: 0,
      data: [],
      error: null,
    });

    expect(await getEquipmentHours(1)).toEqual({
      categories: [],
      pageCount: 0,
    });
    expect(inFilter).not.toHaveBeenCalled();
  });

  it("refuses anyone who is not an administrator before reading", async () => {
    vi.mocked(isAdministratorSignedIn).mockResolvedValue(
      false
    );

    await expect(
      getEquipmentHours(1)
    ).rejects.toBeInstanceOf(EquipmentHoursAccessError);
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("throws the database error", async () => {
    limit.mockResolvedValue({
      data: null,
      error: EQUIPMENT_HOURS_TEST.DATABASE_ERROR,
    });

    await expect(getEquipmentHours(1)).rejects.toThrow();
  });
});
