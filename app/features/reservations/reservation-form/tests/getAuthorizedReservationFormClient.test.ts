import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { RESERVATION_FORM_ACCESS } from "../constants/ReservationFormUi.constants";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { RESERVATION_ACCESS_TEST_FIXTURE } from "./getAuthorizedReservationFormClient.constants";

const { redirect } = vi.hoisted(() => ({
  redirect: vi.fn((path: string): never => {
    throw new Error(path);
  }),
}));

vi.mock("next/navigation", () => ({ redirect }));
vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

const createSupabaseClientFixture = (
  hasReservationArea: boolean,
  isAdministrator: boolean,
  hasAuthenticatedWorker: boolean
) => {
  const supabaseClient = {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: hasAuthenticatedWorker
            ? {
                id: RESERVATION_ACCESS_TEST_FIXTURE.WORKER_ID,
              }
            : null,
        },
        error: null,
      }),
    },
    rpc: vi
      .fn()
      .mockImplementation((functionName: string) =>
        Promise.resolve({
          data:
            functionName ===
            RESERVATION_FORM_ACCESS.AREA_RPC
              ? hasReservationArea
              : isAdministrator,
          error: null,
        })
      ),
  };

  vi.mocked(createServerSupabaseClient).mockResolvedValue(
    supabaseClient as unknown as Awaited<
      ReturnType<typeof createServerSupabaseClient>
    >
  );
};

describe("getAuthorizedReservationFormClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows an authenticated worker with the reservations area", async () => {
    createSupabaseClientFixture(true, false, true);

    await expect(
      getAuthorizedReservationFormClient()
    ).resolves.toBeDefined();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("allows an administrator without the reservations area", async () => {
    createSupabaseClientFixture(false, true, true);

    await expect(
      getAuthorizedReservationFormClient()
    ).resolves.toBeDefined();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("redirects a worker without the reservations area", async () => {
    createSupabaseClientFixture(false, false, true);

    await expect(
      getAuthorizedReservationFormClient()
    ).rejects.toThrow(
      RESERVATION_ACCESS_TEST_FIXTURE.HOME_PATH
    );
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("redirects visitors without a session to login", async () => {
    createSupabaseClientFixture(false, false, false);

    await expect(
      getAuthorizedReservationFormClient()
    ).rejects.toThrow(
      RESERVATION_ACCESS_TEST_FIXTURE.LOGIN_PATH
    );
    expect(redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.LOGIN
    );
  });
});
