import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import {
  RESERVATION_DOCK_NOTICE_ERROR,
  RESERVATION_DOCK_NOTICE_RPC,
} from "../constants/ReservationDockNotice.constants";
import { setReservationDockNotice } from "../services/setReservationDockNotice";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const rpc = vi.fn();
const NOT_A_UUID = "not-a-uuid";
const DATABASE_FAILURE = {
  code: "55000",
  details: "",
  hint: "",
  message: "The reservation cannot be sent to the dock",
};

describe("setReservationDockNotice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      {
        rpc,
      } as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );
    rpc.mockResolvedValue({ error: null });
  });

  it("calls the database function with the reservation and the new state", async () => {
    await setReservationDockNotice({
      isNotified: true,
      reservationId: RESERVATION_DETAIL_TEST.RESERVATION_ID,
    });

    expect(rpc).toHaveBeenCalledWith(
      RESERVATION_DOCK_NOTICE_RPC,
      {
        p_notified: true,
        p_reservation_id:
          RESERVATION_DETAIL_TEST.RESERVATION_ID,
      }
    );
  });

  it("refuses a reservation id that is not a uuid before asking the database", async () => {
    await expect(
      setReservationDockNotice({
        isNotified: true,
        reservationId: NOT_A_UUID,
      })
    ).rejects.toThrow(
      RESERVATION_DOCK_NOTICE_ERROR.INVALID_INPUT
    );
    expect(rpc).not.toHaveBeenCalled();
  });

  it("throws when the database refuses the change", async () => {
    rpc.mockResolvedValue({ error: DATABASE_FAILURE });

    await expect(
      setReservationDockNotice({
        isNotified: true,
        reservationId:
          RESERVATION_DETAIL_TEST.RESERVATION_ID,
      })
    ).rejects.toThrow();
  });
});
