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
import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";
import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { updateOwnReservationCalendarPageSize } from "../services/updateOwnReservationCalendarPageSize";

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

const selectedRows = vi.fn();
const select = vi.fn();
const update = vi.fn();
const eq = vi.fn();
const from = vi.fn();

describe("reservation calendar page size update", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    selectedRows.mockResolvedValue({
      data: [{ id: SIGNED_IN_USER_ID }],
      error: null,
    });
    select.mockReturnValue({ eq });
    update.mockReturnValue({ eq });
    eq.mockReturnValue({ select: selectedRows });
    from.mockReturnValue({ select, update });
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      { from } as never
    );
    vi.mocked(readSignedInUserId).mockResolvedValue(
      SIGNED_IN_USER_ID
    );
  });

  it("rejects unsupported sizes before querying", async () => {
    await expect(
      updateOwnReservationCalendarPageSize(
        INVALID_PAGE_SIZE
      )
    ).rejects.toThrow(
      RESERVATION_CALENDAR_LIST_ERROR.INVALID_REQUEST
    );
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
  });

  it("updates only the signed-in worker preference", async () => {
    const pageSize: ReservationCalendarPageSize =
      RESERVATION_CALENDAR_LIST.PAGE_SIZE_OPTIONS[2];
    await expect(
      updateOwnReservationCalendarPageSize(pageSize)
    ).resolves.toBeUndefined();
    expect(from).toHaveBeenCalledWith(
      SUPABASE_TABLE.WORKERS
    );
    expect(update).toHaveBeenCalledWith({
      [SUPABASE_WORKER_COLUMN.RESERVATION_CALENDAR_PAGE_SIZE]:
        pageSize,
    });
    expect(eq).toHaveBeenCalledWith(
      SUPABASE_WORKER_COLUMN.ID,
      SIGNED_IN_USER_ID
    );
    expect(selectedRows).toHaveBeenCalledWith(
      SUPABASE_WORKER_COLUMN.ID
    );
  });

  it("rejects a missing signed-in worker without updating", async () => {
    vi.mocked(readSignedInUserId).mockResolvedValue(null);
    await expect(
      updateOwnReservationCalendarPageSize(
        RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE
      )
    ).rejects.toThrow(SUPABASE_TABLE.WORKERS);
    expect(update).not.toHaveBeenCalled();
  });

  it("rejects update failures and rows hidden by row-level security", async () => {
    selectedRows.mockResolvedValueOnce({
      data: null,
      error: DATABASE_FAILURE,
    });
    await expect(
      updateOwnReservationCalendarPageSize(
        RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE
      )
    ).rejects.toThrow(SUPABASE_TABLE.WORKERS);
    selectedRows.mockResolvedValueOnce({
      data: [],
      error: null,
    });
    await expect(
      updateOwnReservationCalendarPageSize(
        RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE
      )
    ).rejects.toThrow(SUPABASE_TABLE.WORKERS);
  });
});
