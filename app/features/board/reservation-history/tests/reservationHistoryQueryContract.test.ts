import { describe, expect, it } from "vitest";
import {
  PAGINATION,
  POSTGRES_INTEGER_MAX,
  RESERVATION_HISTORY_FILTER_PARAM,
} from "@/app/constants";
import { parseReservationHistorySearchParams } from "@/app/services/board/reservation-history/utils/parseReservationHistorySearchParams";
import { buildReservationHistoryQueryString } from "../utils/buildReservationHistoryQueryString";
import {
  CONTRACT_OVERFLOWING_PAGE,
  CONTRACT_ROUND_TRIP_PARAMS,
  CONTRACT_YEAR_ZERO_DATE,
} from "./ReservationHistoryHref.constants";

describe("reservation history query contract", () => {
  it("keeps the page index inside the SQL integer range", () => {
    const { pageIndex } =
      parseReservationHistorySearchParams({
        [PAGINATION.QUERY_PARAMS.PAGE]:
          CONTRACT_OVERFLOWING_PAGE,
      });

    expect(pageIndex).toBeLessThanOrEqual(
      POSTGRES_INTEGER_MAX
    );
  });

  it("rejects a year Postgres cannot cast to a date", () => {
    const { filters } = parseReservationHistorySearchParams(
      {
        [RESERVATION_HISTORY_FILTER_PARAM.FROM]:
          CONTRACT_YEAR_ZERO_DATE,
      }
    );

    expect(filters.from).toBeNull();
  });

  it("parses back the query it builds", () => {
    const query = parseReservationHistorySearchParams(
      CONTRACT_ROUND_TRIP_PARAMS
    );
    const reparsed = parseReservationHistorySearchParams(
      Object.fromEntries(
        new URLSearchParams(
          buildReservationHistoryQueryString(query)
        )
      )
    );

    expect(reparsed).toEqual(query);
  });
});
