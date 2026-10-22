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

describe("createPredefinedComboReservationAction access", () => {
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

  it("does not persist when reservation authorization rejects", async () => {
    vi.mocked(
      getAuthorizedReservationFormClient
    ).mockRejectedValue(
      PREDEFINED_COMBO_RESERVATION_ACTION_TEST.AUTHORIZATION_ERROR
    );

    await expect(
      createPredefinedComboReservationAction(
        PREDEFINED_COMBO_RESERVATION_ACTION_TEST.INPUT
      )
    ).rejects.toBe(
      PREDEFINED_COMBO_RESERVATION_ACTION_TEST.AUTHORIZATION_ERROR
    );
    expect(
      createPredefinedComboReservation
    ).not.toHaveBeenCalled();
  });
});
