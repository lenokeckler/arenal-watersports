import { ERRORS } from "@/app/constants/errors/Errors.constant";
import {
  DISPATCH_BOARD_MAX_PAGE,
  DISPATCH_BOARD_PAGINATION,
} from "../constants/DispatchBoard.constants";
import {
  COSTA_RICA_DATE_FIXTURE,
  INVALID_PENDING_DISPATCH_PAGE_FIXTURES,
  PENDING_RESERVATION_FIXTURE,
} from "./DispatchBoardTest.constants";
import { createOperationsClient } from "./getPendingDispatchReservations.test-utils";
import { getPendingDispatchReservations } from "@/app/services/operations/getPendingDispatchReservations";

describe("getPendingDispatchReservations", () => {
  it("requests one extra row to determine whether another page exists", async () => {
    const reservations = Array.from(
      { length: DISPATCH_BOARD_PAGINATION.PAGE_SIZE + 1 },
      (_, index) => ({
        ...PENDING_RESERVATION_FIXTURE,
        id: String(index),
      })
    );
    const { rpc } = createOperationsClient(
      true,
      true,
      reservations
    );

    const result = await getPendingDispatchReservations(
      DISPATCH_BOARD_PAGINATION.FIRST_PAGE
    );

    expect(result.reservations).toHaveLength(
      DISPATCH_BOARD_PAGINATION.PAGE_SIZE
    );
    expect(result.hasNextPage).toBe(true);
    expect(rpc).toHaveBeenCalledTimes(2);
  });

  it("queries the half-open Costa Rica day range", async () => {
    const { rpc } = createOperationsClient(true, true, [
      PENDING_RESERVATION_FIXTURE,
    ]);

    await getPendingDispatchReservations(
      DISPATCH_BOARD_PAGINATION.FIRST_PAGE,
      COSTA_RICA_DATE_FIXTURE.TODAY_AT_LOCAL_MIDNIGHT
    );

    expect(rpc).toHaveBeenNthCalledWith(
      2,
      "pending_dispatch_reservations",
      {
        p_ends_at:
          COSTA_RICA_DATE_FIXTURE.EXPECTED_TODAY_END,
        p_limit: DISPATCH_BOARD_PAGINATION.PAGE_SIZE + 1,
        p_offset: 0,
        p_starts_at:
          COSTA_RICA_DATE_FIXTURE.EXPECTED_TODAY_START,
      }
    );
  });

  it("allows the greatest page with a PostgreSQL integer offset", async () => {
    const maximumOffset =
      (DISPATCH_BOARD_MAX_PAGE -
        DISPATCH_BOARD_PAGINATION.FIRST_PAGE) *
      DISPATCH_BOARD_PAGINATION.PAGE_SIZE;
    const { rpc } = createOperationsClient(true, true);

    await getPendingDispatchReservations(
      DISPATCH_BOARD_MAX_PAGE
    );

    expect(rpc).toHaveBeenNthCalledWith(
      2,
      "pending_dispatch_reservations",
      expect.objectContaining({ p_offset: maximumOffset })
    );
    expect(maximumOffset).toBeLessThanOrEqual(
      DISPATCH_BOARD_PAGINATION.MAX_OFFSET
    );
  });

  it("propagates RPC errors", async () => {
    const { rpc } = createOperationsClient(true, true);
    rpc.mockReset();
    rpc.mockResolvedValueOnce({ data: true, error: null });
    rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "RPC failure" },
    });

    await expect(
      getPendingDispatchReservations(
        DISPATCH_BOARD_PAGINATION.FIRST_PAGE
      )
    ).rejects.toThrow("RPC failure");
  });

  it("rejects a null RPC response without an error", async () => {
    const { rpc } = createOperationsClient(true, true);
    rpc.mockReset();
    rpc.mockResolvedValueOnce({ data: true, error: null });
    rpc.mockResolvedValueOnce({ data: null, error: null });

    await expect(
      getPendingDispatchReservations(
        DISPATCH_BOARD_PAGINATION.FIRST_PAGE
      )
    ).rejects.toThrow(ERRORS.COMMON.SERVER);
  });

  it.each(
    Object.values(INVALID_PENDING_DISPATCH_PAGE_FIXTURES)
  )(
    "rejects invalid page %s before requesting reservation data",
    async (page) => {
      const { rpc } = createOperationsClient(true, true);

      await expect(
        getPendingDispatchReservations(page)
      ).rejects.toMatchObject({
        message: ERRORS.PAGINATION.INVALID_PAGE,
        name: "RangeError",
      });
      expect(rpc).toHaveBeenCalledOnce();
    }
  );
});
