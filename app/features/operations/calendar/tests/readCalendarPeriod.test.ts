import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  CALENDAR_VIEW,
  SUPABASE_WORK_AREA,
  PATHS,
} from "@/app/constants";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode/readWorkModeOverviewAsSignedIn";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { fetchReservationCalendarRows } from "@/app/services/reservations/fetchReservationCalendarRows";
import { readOperationsCalendarRows } from "@/app/services/reservations/readOperationsCalendarRows";
import { readOperationsCalendarPeriod } from "../actions/readOperationsCalendarPeriod";
import { readCalendarSnapshotForArea as readReservationCalendarPeriod } from "@/app/services/reservations/readCalendarSnapshotForArea";
import { QUERY_WINDOW } from "@/app/services/reservations/tests/ReservationCalendarQuery.constants";
import { RESERVATION_CALENDAR_QUERY_MAPPING_ROW } from "@/app/services/reservations/tests/ReservationCalendarQueryMapping.constants";
import { CALENDAR_ACCESS_REQUEST } from "@/app/services/reservations/tests/CalendarAccess.constants";

vi.mock("next/navigation", () => ({
  redirect: vi.fn((path: string) => {
    throw new Error(path);
  }),
}));
vi.mock(
  "@/app/services/work-mode/readWorkModeOverviewAsSignedIn",
  () => ({ readWorkModeOverviewAsSignedIn: vi.fn() })
);
vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));
vi.mock(
  "@/app/services/reservations/fetchReservationCalendarRows",
  () => ({
    fetchReservationCalendarRows: vi.fn(),
  })
);

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(fetchReservationCalendarRows).mockResolvedValue(
    {
      rows: [RESERVATION_CALENDAR_QUERY_MAPPING_ROW],
      totalCount: 1,
    }
  );
});

describe("Operations calendar rows", () => {
  it("reads through the area gate", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue({
      areas: [SUPABASE_WORK_AREA.OPERATIONS],
      current: SUPABASE_WORK_AREA.OPERATIONS,
    });
    await expect(
      readOperationsCalendarRows(QUERY_WINDOW)
    ).resolves.toEqual({
      rows: [RESERVATION_CALENDAR_QUERY_MAPPING_ROW],
      totalCount: 1,
    });
    expect(
      createServerSupabaseClient
    ).toHaveBeenCalledOnce();
  });

  it("never starts a query for a refused account", async () => {
    vi.mocked(
      readWorkModeOverviewAsSignedIn
    ).mockResolvedValue({
      areas: [],
      current: SUPABASE_WORK_AREA.OPERATIONS,
    });
    await expect(
      readOperationsCalendarRows(QUERY_WINDOW)
    ).rejects.toThrow(PATHS.HOME);
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
    expect(
      fetchReservationCalendarRows
    ).not.toHaveBeenCalled();
  });
});

describe.each([
  [
    SUPABASE_WORK_AREA.RESERVATIONS,
    readReservationCalendarPeriod,
  ],
  [
    SUPABASE_WORK_AREA.OPERATIONS,
    readOperationsCalendarPeriod,
  ],
] as const)(
  "calendar period read for %s",
  (area, readPeriod) => {
    it("maps complete rows including assigned guides", async () => {
      vi.mocked(
        readWorkModeOverviewAsSignedIn
      ).mockResolvedValue({ areas: [area], current: area });
      const result = await readPeriod(
        CALENDAR_ACCESS_REQUEST
      );
      expect(result.totalCount).toBe(1);
      expect(result.entries[0].guides).toHaveLength(
        RESERVATION_CALENDAR_QUERY_MAPPING_ROW
          .reservation_guides.length
      );
      expect(result.entries[0].id).toBe(
        RESERVATION_CALENDAR_QUERY_MAPPING_ROW.id
      );
    });

    it("rejects invalid periods before querying", async () => {
      await expect(
        readPeriod({
          ...CALENDAR_ACCESS_REQUEST,
          anchor: {
            ...CALENDAR_ACCESS_REQUEST.anchor,
            month: 0,
          },
          view: CALENDAR_VIEW.DAY,
        })
      ).rejects.toThrow();
      expect(
        fetchReservationCalendarRows
      ).not.toHaveBeenCalled();
    });
  }
);
