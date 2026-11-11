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
import { createCustomComboReservationAction } from "../actions/createCustomComboReservationAction";
import { createCustomComboReservation } from "../services/createCustomComboReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { CUSTOM_COMBO_RESERVATION_ACTION_TEST } from "./createCustomComboReservationAction.constants";

vi.mock("../services/createCustomComboReservation", () => ({
  createCustomComboReservation: vi.fn(),
}));

vi.mock(
  "../services/getAuthorizedReservationFormClient",
  () => ({
    getAuthorizedReservationFormClient: vi.fn(),
  })
);

describe("createCustomComboReservationAction persistence", () => {
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

  it("authorizes and persists normalized combo data", async () => {
    vi.mocked(
      createCustomComboReservation
    ).mockResolvedValue(
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.CREATED_RESERVATION_ID
    );

    await expect(
      createCustomComboReservationAction(
        CUSTOM_COMBO_RESERVATION_ACTION_TEST.INPUT
      )
    ).resolves.toEqual({
      ok: true,
      reservationId:
        CUSTOM_COMBO_RESERVATION_ACTION_TEST.CREATED_RESERVATION_ID,
    });
    expect(
      getAuthorizedReservationFormClient
    ).toHaveBeenCalledOnce();
    expect(
      createCustomComboReservation
    ).toHaveBeenCalledWith(
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.VALIDATED_INPUT
    );
  });

  it("does not persist a combo when authorization rejects", async () => {
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockRejectedValue(
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.AUTHORIZATION_ERROR
    );

    await expect(
      createCustomComboReservationAction(
        CUSTOM_COMBO_RESERVATION_ACTION_TEST.INPUT
      )
    ).rejects.toBe(
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.AUTHORIZATION_ERROR
    );
    expect(
      createCustomComboReservation
    ).not.toHaveBeenCalled();
  });

  it("propagates reservation persistence failures", async () => {
    vi.mocked(
      createCustomComboReservation
    ).mockRejectedValue(
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.SERVICE_ERROR
    );

    await expect(
      createCustomComboReservationAction(
        CUSTOM_COMBO_RESERVATION_ACTION_TEST.INPUT
      )
    ).rejects.toBe(
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.SERVICE_ERROR
    );
    expect(
      createCustomComboReservation
    ).toHaveBeenCalledWith(
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.VALIDATED_INPUT
    );
  });
});
