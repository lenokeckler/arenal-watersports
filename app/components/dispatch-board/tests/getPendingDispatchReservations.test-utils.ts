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
    })
    .mockResolvedValue({ data: [], error: null });
  const from = vi.fn(() => ({
    select: () => ({
      in: () => Promise.resolve({ data: [], error: null }),
    }),
  }));
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
    from,
    rpc,
  };

  createServerSupabaseClientMock.mockResolvedValue(client);

  return { client, rpc };
};

beforeEach(() => {
  vi.clearAllMocks();
});
