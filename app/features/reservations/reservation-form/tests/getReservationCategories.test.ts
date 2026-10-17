import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { getReservationCategories } from "../services/getReservationCategories";

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

const RESERVATION_CATEGORY_TEST = {
  CONCRETE_ID: "category-concrete",
  INTERCHANGEABLE_ID: "category-interchangeable",
};

describe("getReservationCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads reservable categories without querying unit availability", async () => {
    const categoryQuery = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: [
          {
            id: RESERVATION_CATEGORY_TEST.INTERCHANGEABLE_ID,
            name: "Jet Ski",
            units_are_interchangeable: true,
          },
          {
            id: RESERVATION_CATEGORY_TEST.CONCRETE_ID,
            name: "Lancha",
            units_are_interchangeable: false,
          },
        ],
        error: null,
      }),
    };
    const supabaseClient = {
      from: vi.fn(() => categoryQuery),
    };
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(
      supabaseClient as unknown as Awaited<
        ReturnType<
          typeof getAuthorizedReservationFormClient
        >
      >
    );

    await expect(
      getReservationCategories()
    ).resolves.toEqual([
      {
        id: RESERVATION_CATEGORY_TEST.INTERCHANGEABLE_ID,
        isInterchangeable: true,
        name: "Jet Ski",
      },
      {
        id: RESERVATION_CATEGORY_TEST.CONCRETE_ID,
        isInterchangeable: false,
        name: "Lancha",
      },
    ]);
    expect(supabaseClient.from).toHaveBeenCalledTimes(1);
    expect(supabaseClient.from).toHaveBeenCalledWith(
      "equipment_categories"
    );
  });
});
