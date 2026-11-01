import { createClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import { PATHS } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { Database } from "@/app/types";
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

const supabaseClient = createClient<Database>(
  RESERVATION_DETAIL_AUTH_TEST.SUPABASE_URL,
  RESERVATION_DETAIL_AUTH_TEST.SUPABASE_ANON_KEY
);

const createClientFixture = (
  hasReservationArea: boolean,
  isAdministrator: boolean,
  isAuthenticated: boolean,
  hasAuthorizationError = false
) => {
  const user = isAuthenticated
    ? {
        id: RESERVATION_DETAIL_AUTH_TEST.AUTHENTICATED_WORKER_ID,
      }
    : null;
  const auth = {
    getUser: () =>
      Promise.resolve({ data: { user }, error: null }),
  };
  const rpc = (functionName: string) =>
    Promise.resolve({
      data:
        functionName === RESERVATION_DETAIL_ACCESS.AREA_RPC
          ? hasReservationArea
          : isAdministrator,
      error: hasAuthorizationError
        ? RESERVATION_DETAIL_AUTH_TEST.ERROR_RESPONSE
        : null,
    });
  const client = new Proxy(supabaseClient, {
    get: (target, property, receiver) => {
      if (property === "auth") {
        return auth;
      }
      if (property === "rpc") {
        return rpc;
      }
      return Reflect.get(target, property, receiver);
    },
  });

  vi.mocked(createServerSupabaseClient).mockResolvedValue(
    client
  );
};

describe("getAuthorizedReservationDetailClient", () => {
  it("allows an authenticated Reservations worker", async () => {
    createClientFixture(true, false, true);
    await expect(
      getAuthorizedReservationDetailClient()
    ).resolves.toBeDefined();
  });

  it("redirects an administrator without the area and an unauthenticated visitor", async () => {
    createClientFixture(false, true, true);
    await expect(
      getAuthorizedReservationDetailClient()
    ).rejects.toThrow(PATHS.HOME);

    createClientFixture(false, false, false);
    await expect(
      getAuthorizedReservationDetailClient()
    ).rejects.toThrow(PATHS.ACCESS.LOGIN);
  });

  it("preserves Supabase authorization errors", async () => {
    createClientFixture(true, false, true, true);
    await expect(
      getAuthorizedReservationDetailClient()
    ).rejects.toThrow(
      `Supabase query failed: ${RESERVATION_DETAIL_OPERATION.ACCESS}`
    );
  });
});
