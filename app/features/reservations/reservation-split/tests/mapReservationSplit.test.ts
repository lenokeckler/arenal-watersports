import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_ACTIVE_STATUS } from "@/app/constants";
import { RESERVATION_SPLIT_BLOCK } from "../constants/ReservationSplitBlock.constants";
import { mapReservationSplit } from "../utils/mapReservationSplit";
import {
  COSTA_RICA_MIDNIGHT_CASES,
  EXPECTED_SPLIT,
  QUANTITY_ITEM_ROW,
  SINGLE_PERSON_COUNT,
  SINGLE_PIECE_QUANTITY,
  SPLIT_ROW,
  SPLIT_UPDATED_AT,
  UNIT_ITEM_ROW,
} from "./ReservationSplit.constants";

describe("mapReservationSplit", () => {
  it("maps units and quantities, ignoring extras and dispatched items, sorted by id", () => {
    expect(mapReservationSplit(SPLIT_ROW)).toEqual(
      EXPECTED_SPLIT
    );
  });

  it("keeps the raw updated_at string as the stale token", () => {
    expect(
      mapReservationSplit(SPLIT_ROW).expectedUpdatedAt
    ).toBe(SPLIT_UPDATED_AT);
  });

  it("blocks a reservation that is not scheduled", () => {
    const row = {
      ...SPLIT_ROW,
      status: RESERVATION_CALENDAR_ACTIVE_STATUS.DISPATCHED,
    };

    expect(mapReservationSplit(row).splitBlock).toBe(
      RESERVATION_SPLIT_BLOCK.NOT_SCHEDULED
    );
  });

  it("blocks a reservation with a single person", () => {
    const row = {
      ...SPLIT_ROW,
      people_count: SINGLE_PERSON_COUNT,
    };

    expect(mapReservationSplit(row).splitBlock).toBe(
      RESERVATION_SPLIT_BLOCK.TOO_FEW_PEOPLE
    );
  });

  it("blocks a reservation with a single piece of equipment", () => {
    const row = {
      ...SPLIT_ROW,
      reservation_items: [
        {
          ...QUANTITY_ITEM_ROW,
          quantity: SINGLE_PIECE_QUANTITY,
        },
      ],
    };

    expect(mapReservationSplit(row).splitBlock).toBe(
      RESERVATION_SPLIT_BLOCK.TOO_LITTLE_EQUIPMENT
    );
  });

  it("counts two units as enough equipment", () => {
    const row = {
      ...SPLIT_ROW,
      reservation_items: [UNIT_ITEM_ROW, UNIT_ITEM_ROW],
    };

    expect(mapReservationSplit(row).splitBlock).toBe(
      RESERVATION_SPLIT_BLOCK.NONE
    );
  });

  it.each(COSTA_RICA_MIDNIGHT_CASES)(
    "reads %s as Costa Rica %s at %s",
    (startsAt, date, time) => {
      const split = mapReservationSplit({
        ...SPLIT_ROW,
        starts_at: startsAt,
      });

      expect(split.date).toBe(date);
      expect(split.time).toBe(time);
    }
  );
});
