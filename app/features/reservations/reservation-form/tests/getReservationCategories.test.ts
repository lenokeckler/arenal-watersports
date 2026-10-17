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

  it("maps physically eligible categories from the authorized rpc", async () => {
    const rpc = vi.fn().mockResolvedValue({
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
    });
    const supabaseClient = {
      rpc,
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
    expect(rpc).toHaveBeenCalledWith(
      "reservable_equipment_categories"
    );
  });

  it("preserves the operation context when the eligibility rpc fails", async () => {
    const rpc = vi.fn().mockResolvedValue({
      data: null,
      error: {
        code: "XX000",
        message: "Eligibility query failed",
      },
    });
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue({ rpc } as never);

    await expect(
      getReservationCategories()
    ).rejects.toThrow(
      "Supabase query failed: load reservation categories"
    );
  });
});
