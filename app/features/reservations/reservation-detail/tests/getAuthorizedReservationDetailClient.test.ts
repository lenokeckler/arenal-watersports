import { createClient } from "@supabase/supabase-js";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import type { Database } from "@/app/types";
import { getAuthorizedReservationDetailClient } from "../services/getAuthorizedReservationDetailClient";
import { RESERVATION_DETAIL_AUTH_TEST } from "./ReservationDetailAuthorizationTest.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));
vi.mock(
  "@/app/services/reservations/assertReservationCalendarAccess",
  () => ({
    assertReservationCalendarAccess: vi.fn(),
  })
);

const supabaseClient = createClient<Database>(
  RESERVATION_DETAIL_AUTH_TEST.SUPABASE_URL,
  RESERVATION_DETAIL_AUTH_TEST.SUPABASE_ANON_KEY
);

describe("getAuthorizedReservationDetailClient", () => {
  beforeEach(() => vi.clearAllMocks());

  it("checks Reservations access in active mode using the request client", async () => {
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      supabaseClient
    );

    await expect(
      getAuthorizedReservationDetailClient()
    ).resolves.toBe(supabaseClient);
    expect(
      assertReservationCalendarAccess
    ).toHaveBeenCalledWith(undefined, supabaseClient);
  });

  it("does not return the client when access is denied", async () => {
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      supabaseClient
    );
    vi.mocked(
      assertReservationCalendarAccess
    ).mockRejectedValue(new Error("Access denied"));

    await expect(
      getAuthorizedReservationDetailClient()
    ).rejects.toThrow("Access denied");
  });
});
