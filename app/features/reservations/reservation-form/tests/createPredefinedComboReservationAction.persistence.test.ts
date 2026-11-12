import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";
import { createPredefinedComboReservationAction } from "../actions/createPredefinedComboReservationAction";
import { createPredefinedComboReservation } from "../services/createPredefinedComboReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { PREDEFINED_COMBO_RESERVATION_ACTION_TEST } from "./createPredefinedComboReservationAction.persistence.constants";

vi.mock(
  "../services/createPredefinedComboReservation",
  () => ({
    createPredefinedComboReservation: vi.fn(),
  })
);

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

describe("createPredefinedComboReservationAction persistence", () => {
  const supabaseClient = createClient<Database>(
    SUPABASE.URL,
    SUPABASE.ANON_KEY
  );

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockResolvedValue(supabaseClient);
  });

  it("persists normalized reservation details without client price or item overrides", async () => {
    vi.mocked(
      createPredefinedComboReservation
    ).mockResolvedValue(
      PREDEFINED_COMBO_RESERVATION_ACTION_TEST.CREATED_RESERVATION_ID
    );
    const inputWithUntrustedOverrides = {
      ...PREDEFINED_COMBO_RESERVATION_ACTION_TEST.INPUT,
      items: [
        {
          categoryId:
            "e4800000-0000-4000-8000-000000000103",
          quantity: 99,
        },
      ],
      packagePriceCrc: 1,
    };

    await expect(
      createPredefinedComboReservationAction(
        inputWithUntrustedOverrides
      )
    ).resolves.toEqual({
      ok: true,
      reservationId:
        PREDEFINED_COMBO_RESERVATION_ACTION_TEST.CREATED_RESERVATION_ID,
    });
    expect(
      createPredefinedComboReservation
    ).toHaveBeenCalledWith(
      PREDEFINED_COMBO_RESERVATION_ACTION_TEST.VALIDATED_INPUT
    );
  });

  it("propagates reservation persistence failures", async () => {
    vi.mocked(
      createPredefinedComboReservation
    ).mockRejectedValue(
      PREDEFINED_COMBO_RESERVATION_ACTION_TEST.PERSISTENCE_ERROR
    );

    await expect(
      createPredefinedComboReservationAction(
        PREDEFINED_COMBO_RESERVATION_ACTION_TEST.INPUT
      )
    ).rejects.toBe(
      PREDEFINED_COMBO_RESERVATION_ACTION_TEST.PERSISTENCE_ERROR
    );
    expect(
      createPredefinedComboReservation
    ).toHaveBeenCalledWith(
      PREDEFINED_COMBO_RESERVATION_ACTION_TEST.VALIDATED_INPUT
    );
  });
});
