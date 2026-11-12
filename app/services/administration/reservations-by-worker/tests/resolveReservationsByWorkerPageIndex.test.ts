import { describe, expect, it } from "vitest";
import { PAGINATION } from "@/app/constants";
import { resolveReservationsByWorkerPageIndex } from "../utils/resolveReservationsByWorkerPageIndex";
import { RESERVATIONS_BY_WORKER_PAGE_PARAMETERS } from "./ReservationsByWorkerPage.constants";

describe("resolveReservationsByWorkerPageIndex", () => {
  it("reads the first page parameter", () => {
    expect(
      resolveReservationsByWorkerPageIndex([
        ...RESERVATIONS_BY_WORKER_PAGE_PARAMETERS.MULTIPLE,
      ])
    ).toBe(
      Number(
        RESERVATIONS_BY_WORKER_PAGE_PARAMETERS.MULTIPLE[
          PAGINATION.DEFAULT_PAGE
        ]
      )
    );
  });

  it("accepts a safe non-negative page index", () => {
    expect(
      resolveReservationsByWorkerPageIndex(
        RESERVATIONS_BY_WORKER_PAGE_PARAMETERS.VALID
      )
    ).toBe(
      RESERVATIONS_BY_WORKER_PAGE_PARAMETERS.VALID_INDEX
    );
  });

  it("defaults invalid page parameters to the first page", () => {
    for (const pageParameter of RESERVATIONS_BY_WORKER_PAGE_PARAMETERS.INVALID) {
      expect(
        resolveReservationsByWorkerPageIndex(pageParameter)
      ).toBe(PAGINATION.DEFAULT_PAGE);
    }
  });
});
