import { describe, expect, it } from "vitest";
import { canAddReservationSplitDeparture } from "../utils/canAddReservationSplitDeparture";
import { resolveReservationSplitDepartureMax } from "../utils/resolveReservationSplitDepartureMax";
import { resolveReservationSplitRemainder } from "../utils/resolveReservationSplitRemainder";
import { EXPECTED_SPLIT } from "./ReservationSplit.constants";
import {
  CAN_ADD_CASES,
  EMPTY_DRAFT,
  FILLED_STATE,
  QUANTITY_ID,
  REMAINDER_CASES,
} from "./ReservationSplitDrafts.constants";

describe("resolveReservationSplitRemainder", () => {
  it.each(REMAINDER_CASES)(
    "derives what stays for %s",
    (_name, state, expected) => {
      expect(
        resolveReservationSplitRemainder(
          EXPECTED_SPLIT,
          state
        )
      ).toEqual(expected);
    }
  );
});

describe("canAddReservationSplitDeparture", () => {
  it.each(CAN_ADD_CASES)(
    "decides with %s",
    (_name, remainder, expected) => {
      expect(
        canAddReservationSplitDeparture(
          remainder,
          FILLED_STATE
        )
      ).toBe(expected);
    }
  );
});

describe("resolveReservationSplitDepartureMax", () => {
  it("lets a draft take all but what the original keeps", () => {
    const remainder = resolveReservationSplitRemainder(
      EXPECTED_SPLIT,
      FILLED_STATE
    );

    expect(
      resolveReservationSplitDepartureMax(
        FILLED_STATE.drafts[0],
        remainder
      )
    ).toEqual({
      peopleCount: EXPECTED_SPLIT.peopleCount - 1,
      quantities: { [QUANTITY_ID]: 4 },
    });
  });

  it("caps a draft when the original cannot give up more", () => {
    const remainder = {
      items: { [QUANTITY_ID]: 3 },
      peopleCount: 1,
      pieces: 1,
    };

    expect(
      resolveReservationSplitDepartureMax(
        EMPTY_DRAFT,
        remainder
      )
    ).toEqual({
      peopleCount: EMPTY_DRAFT.peopleCount,
      quantities: {
        [QUANTITY_ID]: EMPTY_DRAFT.quantities[QUANTITY_ID],
      },
    });
  });
});
