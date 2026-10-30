import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { getCategoryAlerts } from "../services/getCategoryAlerts";
import {
  ALERT_SELECTION,
  CATEGORY_ALERT_ID,
  DEFAULT_CATEGORY_ALERTS,
} from "./CategoryAlerts.constants";
import {
  buildCategoryAlertsRow,
  DEFAULT_CATEGORY_ALERTS_ROW,
} from "./CategoryAlertsRow.constants";

const CATEGORIES_TABLE = "equipment_categories";
const ID_COLUMN = "id";

const mockMaybeSingle = vi.fn();
const mockEq = vi.fn(() => ({
  maybeSingle: mockMaybeSingle,
}));
const mockSelect = vi.fn((_columns: string) => ({
  eq: mockEq,
}));
const mockFrom = vi.fn((_table: string) => ({
  select: mockSelect,
}));

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn().mockResolvedValue({
    from: (table: string) => mockFrom(table),
  }),
}));

describe("getCategoryAlerts", () => {
  beforeEach(() => {
    mockFrom.mockClear();
    mockSelect.mockClear();
    mockEq.mockClear();
    mockMaybeSingle.mockReset();
  });

  it("selects only the alert columns of the category with the given id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_CATEGORY_ALERTS_ROW,
      error: null,
    });

    await getCategoryAlerts(CATEGORY_ALERT_ID);

    expect(mockFrom).toHaveBeenCalledWith(CATEGORIES_TABLE);
    expect(mockSelect).toHaveBeenCalledWith(
      ALERT_SELECTION
    );
    expect(mockEq).toHaveBeenCalledWith(
      ID_COLUMN,
      CATEGORY_ALERT_ID
    );
  });

  it("returns the row mapped to alerts", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: DEFAULT_CATEGORY_ALERTS_ROW,
      error: null,
    });

    expect(
      await getCategoryAlerts(CATEGORY_ALERT_ID)
    ).toEqual(DEFAULT_CATEGORY_ALERTS);
  });

  it("keeps null alert columns as null", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: buildCategoryAlertsRow({
        alert_expiry_days: null,
      }),
      error: null,
    });

    const alerts = await getCategoryAlerts(
      CATEGORY_ALERT_ID
    );

    expect(alerts?.alertExpiryDays).toBeNull();
  });

  it("returns null when no category matches the id", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    expect(
      await getCategoryAlerts(CATEGORY_ALERT_ID)
    ).toBeNull();
  });

  it("returns null when the id is not a valid uuid", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        message: "invalid input syntax for type uuid",
      },
    });

    expect(
      await getCategoryAlerts(CATEGORY_ALERT_ID)
    ).toBeNull();
  });

  it("throws instead of returning null when the query fails", async () => {
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: { code: "500", message: "boom" },
    });

    await expect(
      getCategoryAlerts(CATEGORY_ALERT_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
