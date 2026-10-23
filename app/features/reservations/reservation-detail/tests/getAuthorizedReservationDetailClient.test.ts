import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { PATHS } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import {
  RESERVATION_DETAIL_ACCESS,
  RESERVATION_DETAIL_OPERATION,
} from "../constants/ReservationDetail.constants";
import { getAuthorizedReservationDetailClient } from "../services/getAuthorizedReservationDetailClient";
import { RESERVATION_DETAIL_AUTH_TEST } from "./ReservationDetailAuthorizationTest.constants";

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
  isAuthenticated: boolean
) => {
  const supabaseClient = {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: isAuthenticated
            ? {
                id: RESERVATION_DETAIL_AUTH_TEST.AUTHENTICATED_WORKER_ID,
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
            RESERVATION_DETAIL_ACCESS.AREA_RPC
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

describe("getAuthorizedReservationDetailClient", () => {
  beforeEach(() => vi.clearAllMocks());

  it("allows an authenticated Reservations worker", async () => {
    createSupabaseClientFixture(true, false, true);

    await expect(
      getAuthorizedReservationDetailClient()
    ).resolves.toBeDefined();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("allows an administrator without the Reservations area", async () => {
    createSupabaseClientFixture(false, true, true);

    await expect(
      getAuthorizedReservationDetailClient()
    ).resolves.toBeDefined();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("redirects an unauthenticated visitor to login", async () => {
    createSupabaseClientFixture(false, false, false);

    await expect(
      getAuthorizedReservationDetailClient()
    ).rejects.toThrow(PATHS.ACCESS.LOGIN);
    expect(redirect).toHaveBeenCalledWith(
      PATHS.ACCESS.LOGIN
    );
  });

  it("redirects an authenticated worker without access to home", async () => {
    createSupabaseClientFixture(false, false, true);

    await expect(
      getAuthorizedReservationDetailClient()
    ).rejects.toThrow(PATHS.HOME);
    expect(redirect).toHaveBeenCalledWith(PATHS.HOME);
  });

  it("preserves Supabase authorization errors", async () => {
    const supabaseClient = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: {
            user: {
              id: RESERVATION_DETAIL_AUTH_TEST.AUTHENTICATED_WORKER_ID,
            },
          },
          error: null,
        }),
      },
      rpc: vi.fn().mockResolvedValue({
        data: null,
        error: {
          code: RESERVATION_DETAIL_AUTH_TEST.ERROR_CODE,
          details: "",
          hint: "",
          message:
            RESERVATION_DETAIL_AUTH_TEST.ERROR_MESSAGE,
        },
      }),
    };
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      supabaseClient as unknown as Awaited<
        ReturnType<typeof createServerSupabaseClient>
      >
    );

    await expect(
      getAuthorizedReservationDetailClient()
    ).rejects.toThrow(
      `Supabase query failed: ${RESERVATION_DETAIL_OPERATION.ACCESS}`
    );
  });
});
