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
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { createCustomComboReservation } from "../services/createCustomComboReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
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

describe("createCustomComboReservationAction", () => {
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

  it("rejects malformed input before authorization or persistence", async () => {
    await expect(
      createCustomComboReservationAction(
        CUSTOM_COMBO_RESERVATION_ACTION_TEST.INVALID_SHAPE
      )
    ).resolves.toEqual({
      errors: {},
      formError: RESERVATION_FORM_UI_COPY.SUBMIT_ERROR,
      ok: false,
    });
    expect(
      getAuthorizedReservationFormClient
    ).not.toHaveBeenCalled();
    expect(
      createCustomComboReservation
    ).not.toHaveBeenCalled();
  });

  it("rejects sparse equipment arrays before authorization", async () => {
    const inputWithSparseItems = {
      ...CUSTOM_COMBO_RESERVATION_ACTION_TEST.INPUT,
      items: [
        ...CUSTOM_COMBO_RESERVATION_ACTION_TEST.INPUT.items,
      ],
    };
    delete inputWithSparseItems.items[0];

    await expect(
      createCustomComboReservationAction(
        inputWithSparseItems
      )
    ).resolves.toMatchObject({ ok: false });
    expect(
      getAuthorizedReservationFormClient
    ).not.toHaveBeenCalled();
    expect(
      createCustomComboReservation
    ).not.toHaveBeenCalled();
  });

  it("rejects sparse guide assignments before authorization", async () => {
    const sparseGuideIds =
      CUSTOM_COMBO_RESERVATION_ACTION_TEST.INPUT.items.map(
        (item) => item.categoryId
      );
    delete sparseGuideIds[0];
    const inputWithSparseGuides = {
      ...CUSTOM_COMBO_RESERVATION_ACTION_TEST.INPUT,
      guideIds: sparseGuideIds,
    };

    await expect(
      createCustomComboReservationAction(
        inputWithSparseGuides
      )
    ).resolves.toMatchObject({ ok: false });
    expect(
      getAuthorizedReservationFormClient
    ).not.toHaveBeenCalled();
    expect(
      createCustomComboReservation
    ).not.toHaveBeenCalled();
  });

  it("returns field validation errors without persisting invalid values", async () => {
    await expect(
      createCustomComboReservationAction(
        CUSTOM_COMBO_RESERVATION_ACTION_TEST.INVALID_DURATION_INPUT
      )
    ).resolves.toMatchObject({
      errors: {
        [CUSTOM_COMBO_RESERVATION_FIELD.DURATION_HOURS]:
          expect.any(String),
      },
      ok: false,
    });
    expect(
      getAuthorizedReservationFormClient
    ).toHaveBeenCalledOnce();
    expect(
      createCustomComboReservation
    ).not.toHaveBeenCalled();
  });
});
