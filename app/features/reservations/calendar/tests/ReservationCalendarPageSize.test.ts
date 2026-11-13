import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  RESERVATION_CALENDAR_LIST,
  RESERVATION_CALENDAR_LIST_ERROR,
} from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readOwnReservationCalendarPageSize } from "../services/readOwnReservationCalendarPageSize";

const SIGNED_IN_USER_ID = "worker-id";
const INVALID_PAGE_SIZE =
  RESERVATION_CALENDAR_LIST.PAGE_SIZE_OPTIONS[0] +
  RESERVATION_CALENDAR_LIST.REQUEST_SEQUENCE_INCREMENT;
const DATABASE_FAILURE = {
  code: "42501",
  details: "",
  hint: "",
  message: "permission denied",
};

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));
vi.mock(
  "@/app/services/authentication/readSignedInUserId",
  () => ({
    readSignedInUserId: vi.fn(),
  })
);

const maybeSingle = vi.fn();
const select = vi.fn();
const eq = vi.fn();
const from = vi.fn();

describe("reservation calendar page size services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    maybeSingle.mockResolvedValue({
      data: {
        reservation_calendar_page_size:
          RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE,
      },
      error: null,
    });
    select.mockReturnValue({ eq });
    eq.mockReturnValue({ maybeSingle });
    from.mockReturnValue({ select });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { from } as never
    );
    vi.mocked(readSignedInUserId).mockResolvedValue(
      SIGNED_IN_USER_ID
    );
  });

  it("reads the preference for the signed-in worker only", async () => {
    const pageSize =
      RESERVATION_CALENDAR_LIST.PAGE_SIZE_OPTIONS[1];
    maybeSingle.mockResolvedValue({
      data: { reservation_calendar_page_size: pageSize },
      error: null,
    });

    await expect(
      readOwnReservationCalendarPageSize()
    ).resolves.toBe(pageSize);
    expect(from).toHaveBeenCalledWith(
      SUPABASE_TABLE.WORKERS
    );
    expect(select).toHaveBeenCalledWith(
      SUPABASE_WORKER_COLUMN.RESERVATION_CALENDAR_PAGE_SIZE
    );
    expect(eq).toHaveBeenCalledWith(
      SUPABASE_WORKER_COLUMN.ID,
      SIGNED_IN_USER_ID
    );
  });

  it("returns null without a signed-in worker", async () => {
    vi.mocked(readSignedInUserId).mockResolvedValue(null);

    await expect(
      readOwnReservationCalendarPageSize()
    ).resolves.toBeNull();
    expect(from).not.toHaveBeenCalled();
  });

  it("uses the default for a missing row or an invalid stored size", async () => {
    maybeSingle.mockResolvedValueOnce({
      data: null,
      error: null,
    });
    await expect(
      readOwnReservationCalendarPageSize()
    ).resolves.toBe(
      RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE
    );

    maybeSingle.mockResolvedValueOnce({
      data: {
        reservation_calendar_page_size: INVALID_PAGE_SIZE,
      },
      error: null,
    });
    await expect(
      readOwnReservationCalendarPageSize()
    ).resolves.toBe(
      RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE
    );
  });

  it("reports profile read failures", async () => {
    maybeSingle.mockResolvedValue({
      data: null,
      error: DATABASE_FAILURE,
    });

    await expect(
      readOwnReservationCalendarPageSize()
    ).rejects.toThrow(
      RESERVATION_CALENDAR_LIST_ERROR.PAGE_SIZE_READ
    );
  });
});
