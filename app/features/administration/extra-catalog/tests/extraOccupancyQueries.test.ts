import { describe, expect, it } from "vitest";
import {
  INVENTORY_TRACKING_MODE,
  POSTGRES_ERROR_CODE,
} from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import { fetchExtraOccupancy } from "../services/fetchExtraOccupancy";
import { isExtraUsedInReservations } from "../services/isExtraUsedInReservations";
import { isOccupiableCategory } from "../services/isOccupiableCategory";
import {
  FAKE_EXTRA_ID,
  FAKE_OCCUPIED_CATEGORY_ID,
} from "./Extra.constants";
import {
  EXTRAS_TABLE,
  INVALID_UUID_MESSAGE,
  SERVER_ERROR_CODE,
} from "./ExtraActions.constants";
import { OCCUPYING_COLUMNS } from "./ExtraOccupancy.constants";
import {
  buildQueryClient,
  RESERVATION_ITEMS_TABLE,
} from "./extraOccupancyQueries.harness";

const SERVER_ERROR = {
  code: SERVER_ERROR_CODE,
  message: "boom",
};

describe("isOccupiableCategory", () => {
  it("looks for an active category counted by quantity", async () => {
    const { client, calls } = buildQueryClient({
      data: { id: FAKE_OCCUPIED_CATEGORY_ID },
      error: null,
    });

    expect(
      await isOccupiableCategory(
        client,
        FAKE_OCCUPIED_CATEGORY_ID
      )
    ).toBe(true);
    expect(calls.eq).toEqual([
      ["id", FAKE_OCCUPIED_CATEGORY_ID],
      [
        "tracking_mode",
        INVENTORY_TRACKING_MODE.BY_QUANTITY,
      ],
      ["status", EXTRA_STATUS.ACTIVE],
    ]);
  });

  it("is false when no category matches", async () => {
    const { client } = buildQueryClient({
      data: null,
      error: null,
    });

    expect(
      await isOccupiableCategory(
        client,
        FAKE_OCCUPIED_CATEGORY_ID
      )
    ).toBe(false);
  });

  it("throws when the query fails", async () => {
    const { client } = buildQueryClient({
      data: null,
      error: SERVER_ERROR,
    });

    await expect(
      isOccupiableCategory(
        client,
        FAKE_OCCUPIED_CATEGORY_ID
      )
    ).rejects.toThrow(SupabaseQueryError);
  });
});

describe("isExtraUsedInReservations", () => {
  it.each([
    { count: 1, expected: true },
    { count: 0, expected: false },
    { count: null, expected: false },
  ])(
    "is $expected when $count reservation items use the extra",
    async ({ count, expected }) => {
      const { client, calls } = buildQueryClient({
        count,
        error: null,
      });

      expect(
        await isExtraUsedInReservations(
          client,
          FAKE_EXTRA_ID
        )
      ).toBe(expected);
      expect(calls.from).toBe(RESERVATION_ITEMS_TABLE);
      expect(calls.eq).toEqual([
        ["extra_id", FAKE_EXTRA_ID],
      ]);
    }
  );

  it("throws when the query fails", async () => {
    const { client } = buildQueryClient({
      count: null,
      error: SERVER_ERROR,
    });

    await expect(
      isExtraUsedInReservations(client, FAKE_EXTRA_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});

describe("fetchExtraOccupancy", () => {
  it("reads the occupancy columns of the extra", async () => {
    const { client, calls } = buildQueryClient({
      data: OCCUPYING_COLUMNS,
      error: null,
    });

    expect(
      await fetchExtraOccupancy(client, FAKE_EXTRA_ID)
    ).toEqual(OCCUPYING_COLUMNS);
    expect(calls.from).toBe(EXTRAS_TABLE);
    expect(calls.eq).toEqual([["id", FAKE_EXTRA_ID]]);
  });

  it("is null when the id is not a valid uuid", async () => {
    const { client } = buildQueryClient({
      data: null,
      error: {
        code: POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION,
        message: INVALID_UUID_MESSAGE,
      },
    });

    expect(
      await fetchExtraOccupancy(client, FAKE_EXTRA_ID)
    ).toBeNull();
  });

  it("throws when the query fails", async () => {
    const { client } = buildQueryClient({
      data: null,
      error: SERVER_ERROR,
    });

    await expect(
      fetchExtraOccupancy(client, FAKE_EXTRA_ID)
    ).rejects.toThrow(SupabaseQueryError);
  });
});
