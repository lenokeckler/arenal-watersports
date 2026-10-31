import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import { redirect } from "next/navigation";
import { readWorkModeOverviewAsSignedIn } from "@/app/services/work-mode/readWorkModeOverviewAsSignedIn";
import { assertReservationCalendarAccess } from "../assertReservationCalendarAccess";
import { assertOperationsCalendarAccess } from "../assertOperationsCalendarAccess";

vi.mock("next/navigation", () => ({
  redirect: vi.fn((path: string) => {
    throw new Error(path);
  }),
}));
vi.mock(
  "@/app/services/work-mode/readWorkModeOverviewAsSignedIn",
  () => ({ readWorkModeOverviewAsSignedIn: vi.fn() })
);

const accessChecks = [
  [
    SUPABASE_WORK_AREA.RESERVATIONS,
    assertReservationCalendarAccess,
  ],
  [
    SUPABASE_WORK_AREA.OPERATIONS,
    assertOperationsCalendarAccess,
  ],
] as const;

describe.each(accessChecks)(
  "calendar access for %s",
  (area, assertAccess) => {
    beforeEach(() => vi.clearAllMocks());

    it("allows an account with the matching area and active mode", async () => {
      vi.mocked(
        readWorkModeOverviewAsSignedIn
      ).mockResolvedValue({ areas: [area], current: area });
      await expect(assertAccess()).resolves.toBeUndefined();
      expect(redirect).not.toHaveBeenCalled();
    });

    it("refuses an account without the required area", async () => {
      vi.mocked(
        readWorkModeOverviewAsSignedIn
      ).mockResolvedValue({ areas: [], current: area });
      await expect(assertAccess()).rejects.toThrow(
        PATHS.HOME
      );
    });

    it("redirects an expired session to login", async () => {
      vi.mocked(
        readWorkModeOverviewAsSignedIn
      ).mockResolvedValue(null);
      await expect(assertAccess()).rejects.toThrow(
        PATHS.ACCESS.LOGIN
      );
    });

    it("requires the active mode to match", async () => {
      const otherArea =
        area === SUPABASE_WORK_AREA.RESERVATIONS
          ? SUPABASE_WORK_AREA.OPERATIONS
          : SUPABASE_WORK_AREA.RESERVATIONS;
      vi.mocked(
        readWorkModeOverviewAsSignedIn
      ).mockResolvedValue({
        areas: [area, otherArea],
        current: otherArea,
      });
      await expect(assertAccess()).rejects.toThrow(
        PATHS.HOME
      );
    });

    it("requires an active mode selection", async () => {
      vi.mocked(
        readWorkModeOverviewAsSignedIn
      ).mockResolvedValue({ areas: [area], current: null });
      await expect(assertAccess()).rejects.toThrow(
        PATHS.MODE
      );
    });
  }
);
