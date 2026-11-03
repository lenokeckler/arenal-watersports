import { describe, expect, it } from "vitest";
import {
  PAGINATION,
  RESERVATION_CALENDAR_QUERY,
  STRING,
} from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { buildReservationCalendarQuery } from "../buildReservationCalendarQuery";
import type { ReservationCalendarWindow } from "../models/ReservationCalendarWindow.interface";
import type { ReservationCalendarQueryHarness } from "./models/ReservationCalendarQueryHarness.interface";
import { createReservationCalendarQueryHarness } from "./createReservationCalendarQueryHarness";
import {
  OFFSET_QUERY_WINDOW,
  QUERY_EXPECTED as expected,
  QUERY_TEST,
  QUERY_WINDOW,
} from "./ReservationCalendarQuery.constants";

const execute = async (
  harness: ReservationCalendarQueryHarness,
  window: ReservationCalendarWindow
): Promise<URL> => {
  const result = await buildReservationCalendarQuery(
    harness.client,
    window
  );
  throwIfSupabaseError(result.error, QUERY_TEST.OPERATION);
  expect(result.count).toBe(QUERY_TEST.COUNT);
  expect(harness.fetchRequest).toHaveBeenCalledTimes(1);
  const invocation = harness.fetchRequest.mock.calls[0];
  if (!invocation) {
    throw new Error(QUERY_TEST.REQUEST_ERROR);
  }
  const input = invocation[0];
  return new URL(
    input instanceof Request ? input.url : input.toString()
  );
};

describe("parent reservation membership", (): void => {
  it("unions booked overlap with an independently filtered actual group alias", async (): Promise<void> => {
    const harness = createReservationCalendarQueryHarness();
    const url = await execute(harness, QUERY_WINDOW);
    expect(
      url.searchParams.get(expected.PARAMETERS.ROOT)
    ).toBe(expected.RESERVATIONS);
    expect(
      url.searchParams.get(
        expected.PARAMETERS.ALIAS_CLOSURE
      )
    ).toBe(expected.DEPARTURES);
    expect(
      url.searchParams.get(expected.PARAMETERS.ALIAS_START)
    ).toBe(expected.ALIAS_START);
    expect(
      url.searchParams.get(expected.PARAMETERS.STATUS)
    ).toBe(expected.STATUS);
  });
});

describe("complete reservation payload", (): void => {
  it("keeps the full equipment and dispatch projection separate from alias filters", async (): Promise<void> => {
    const url = await execute(
      createReservationCalendarQueryHarness(),
      QUERY_WINDOW
    );
    expect(
      url.searchParams.get(expected.PARAMETERS.SELECT)
    ).toBe(
      RESERVATION_CALENDAR_QUERY.PROJECTION.replace(
        QUERY_TEST.WHITESPACE,
        STRING.Empty
      )
    );
    expect(
      [...url.searchParams.keys()].filter(
        (parameter): boolean =>
          parameter.startsWith(
            expected.PARAMETERS.PAYLOAD_DISPATCHES
          )
      )
    ).toEqual([]);
  });
});

describe("parent count and pagination", (): void => {
  it("requests one exact parent count with stable parent ordering and range", async (): Promise<void> => {
    const harness = createReservationCalendarQueryHarness();
    const url = await execute(harness, {
      ...QUERY_WINDOW,
      page: PAGINATION.ONE_PAGE,
    });
    expect(
      url.searchParams.get(expected.PARAMETERS.ORDER)
    ).toBe(expected.ORDER);
    expect(
      url.searchParams.get(expected.PARAMETERS.OFFSET)
    ).toBe(RESERVATION_CALENDAR_QUERY.PAGE_SIZE.toString());
    expect(
      url.searchParams.get(expected.PARAMETERS.LIMIT)
    ).toBe(RESERVATION_CALENDAR_QUERY.PAGE_SIZE.toString());
    expect(
      new Headers(
        harness.fetchRequest.mock.calls[0]?.[1]?.headers
      ).get(expected.PARAMETERS.PREFER)
    ).toContain(expected.COUNT);
  });
});

describe("normalized query windows", (): void => {
  it("normalizes explicit offsets before raw filter interpolation", async (): Promise<void> => {
    const url = await execute(
      createReservationCalendarQueryHarness(),
      OFFSET_QUERY_WINDOW
    );
    expect(
      url.searchParams.get(expected.PARAMETERS.ROOT)
    ).toBe(expected.RESERVATIONS);
    expect(
      url.searchParams.get(
        expected.PARAMETERS.ALIAS_CLOSURE
      )
    ).toBe(expected.DEPARTURES);
  });
});
