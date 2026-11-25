import { describe, expect, it } from "vitest";
import { createOperationsClient } from "./getPendingDispatchReservations.test-utils";
import { DISPATCH_BOARD_PAGINATION } from "../constants/DispatchBoard.constants";
import { getBoardPendingDispatch } from "@/app/services/operations/getBoardPendingDispatch";
import { PENDING_RESERVATION_FIXTURE } from "./DispatchBoardTest.constants";

const TWO_RESERVATIONS = [
  PENDING_RESERVATION_FIXTURE,
  { ...PENDING_RESERVATION_FIXTURE, id: "reservation-2" },
];

describe("getBoardPendingDispatch", () => {
  it("shows the link with the number of reservations left for today", async () => {
    createOperationsClient(true, true, TWO_RESERVATIONS);

    await expect(
      getBoardPendingDispatch()
    ).resolves.toEqual({
      count: TWO_RESERVATIONS.length,
      isVisible: true,
    });
  });

  it("asks for one reservation more than a page to know the list is longer", async () => {
    const { rpc } = createOperationsClient(true, true, []);

    await getBoardPendingDispatch();

    expect(rpc).toHaveBeenNthCalledWith(
      2,
      "pending_dispatch_reservations",
      expect.objectContaining({
        p_limit: DISPATCH_BOARD_PAGINATION.PAGE_SIZE + 1,
        p_offset: 0,
      })
    );
  });

  it("hides the link from a worker without the operations area", async () => {
    createOperationsClient(true, false);

    await expect(
      getBoardPendingDispatch()
    ).resolves.toEqual({
      count: null,
      isVisible: false,
    });
  });

  it("hides the link when nobody is signed in", async () => {
    createOperationsClient(false, true);

    await expect(
      getBoardPendingDispatch()
    ).resolves.toEqual({
      count: null,
      isVisible: false,
    });
  });

  it("keeps the link without a number when the count cannot be read", async () => {
    const { rpc } = createOperationsClient(true, true);
    rpc.mockReset();
    rpc
      .mockResolvedValueOnce({ data: true, error: null })
      .mockResolvedValueOnce({
        data: null,
        error: { message: "boom" },
      });

    await expect(
      getBoardPendingDispatch()
    ).resolves.toEqual({
      count: null,
      isVisible: true,
    });
  });
});
