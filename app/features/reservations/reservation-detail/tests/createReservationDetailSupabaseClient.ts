import { vi } from "vitest";

export const createReservationDetailSupabaseClient = () => {
  const query = {
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn(),
    select: vi.fn().mockReturnThis(),
  };

  return {
    from: vi.fn().mockReturnValue(query),
    query,
    rpc: vi.fn(),
  };
};
