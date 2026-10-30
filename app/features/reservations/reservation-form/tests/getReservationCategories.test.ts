import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationCategories } from "../services/getReservationCategories";

const { queryChain } = vi.hoisted(() => {
  const queryStub = {
    select: vi.fn(),
    eq: vi.fn(),
    or: vi.fn(),
    order: vi.fn(),
  };

  return { queryChain: queryStub };
});

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

describe("getReservationCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryChain.select.mockReturnValue(queryChain);
    queryChain.eq.mockReturnValue(queryChain);
    queryChain.or.mockReturnValue(queryChain);
    queryChain.order.mockResolvedValue({
      data: [],
      error: null,
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue({
      from: vi.fn().mockReturnValue(queryChain),
    } as never);
  });

  it("includes quantity tracked and interchangeable categories", async () => {
    await getReservationCategories();

    expect(queryChain.or).toHaveBeenCalledWith(
      "tracking_mode.eq.by_quantity,units_are_interchangeable.eq.true"
    );
  });
});
