import { describe, expect, it } from "vitest";
import { buildReservationSplitInput } from "../utils/buildReservationSplitInput";
import {
  EXPECTED_SPLIT,
  SPLIT_RESERVATION_ID,
  SPLIT_UPDATED_AT,
} from "./ReservationSplit.constants";
import {
  FILLED_DRAFT,
  FILLED_STATE,
  QUANTITY_ID,
  UNIT_ID,
  UNIT_MOVED_STATE,
} from "./ReservationSplitDrafts.constants";

describe("buildReservationSplitInput", () => {
  it("sends the token untouched with the quantities and the units of each departure", () => {
    const state = {
      ...FILLED_STATE,
      unitAssignments: UNIT_MOVED_STATE.unitAssignments,
    };

    expect(
      buildReservationSplitInput(EXPECTED_SPLIT, state)
    ).toEqual({
      departures: [
        {
          items: [
            { itemId: QUANTITY_ID, quantity: 3 },
            { itemId: UNIT_ID, quantity: 1 },
          ],
          peopleCount: FILLED_DRAFT.peopleCount,
          time: FILLED_DRAFT.time,
        },
      ],
      expectedUpdatedAt: SPLIT_UPDATED_AT,
      reservationId: SPLIT_RESERVATION_ID,
    });
  });

  it("leaves out the quantities set to zero", () => {
    const input = buildReservationSplitInput(
      EXPECTED_SPLIT,
      UNIT_MOVED_STATE
    );

    expect(input.departures[0].items).toEqual([
      { itemId: UNIT_ID, quantity: 1 },
    ]);
  });
});
