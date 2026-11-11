import { beforeEach, vi } from "vitest";
import { PENDING_RESERVATION_FIXTURE } from "./DispatchBoardTest.constants";

const { createServerSupabaseClientMock } = vi.hoisted(
  () => ({
    createServerSupabaseClientMock: vi.fn(),
  })
);

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient:
    createServerSupabaseClientMock,
}));

export const createOperationsClient = (
  isAuthenticated: boolean,
  hasOperationsArea: boolean,
  pendingReservations: (typeof PENDING_RESERVATION_FIXTURE)[] = []
) => {
  const rpc = vi
    .fn()
    .mockResolvedValueOnce({
      data: hasOperationsArea,
      error: null,
    })
    .mockResolvedValueOnce({
      data: pendingReservations,
      error: null,
    });
  const client = {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: isAuthenticated
            ? { id: "worker-id" }
            : null,
        },
        error: null,
      }),
    },
    rpc,
  };

  createServerSupabaseClientMock.mockResolvedValue(client);

  return { client, rpc };
};

beforeEach(() => {
  vi.clearAllMocks();
});
