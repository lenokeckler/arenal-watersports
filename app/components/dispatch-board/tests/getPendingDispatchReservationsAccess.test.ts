import { DISPATCH_BOARD_PAGINATION } from "../constants/DispatchBoard.constants";
import { createOperationsClient } from "./getPendingDispatchReservations.test-utils";
import {
  getPendingDispatchReservations,
  OperationsAccessError,
} from "@/app/services/operations/getPendingDispatchReservations";

describe("getPendingDispatchReservations access", () => {
  it("refuses an unauthenticated worker before reading operations data", async () => {
    const { client, rpc } = createOperationsClient(
      false,
      false
    );

    await expect(
      getPendingDispatchReservations(
        DISPATCH_BOARD_PAGINATION.FIRST_PAGE
      )
    ).rejects.toBeInstanceOf(OperationsAccessError);
    expect(client.auth.getUser).toHaveBeenCalledOnce();
    expect(rpc).not.toHaveBeenCalled();
  });

  it("refuses a worker without operations access", async () => {
    const { rpc } = createOperationsClient(true, false);

    await expect(
      getPendingDispatchReservations(
        DISPATCH_BOARD_PAGINATION.FIRST_PAGE
      )
    ).rejects.toBeInstanceOf(OperationsAccessError);
    expect(rpc).toHaveBeenCalledOnce();
  });

  it("propagates authentication lookup errors before checking access", async () => {
    const { client, rpc } = createOperationsClient(
      true,
      true
    );
    const authenticationError = new Error(
      "Authentication lookup failed"
    );
    client.auth.getUser.mockResolvedValueOnce({
      data: { user: null },
      error: authenticationError,
    });

    await expect(
      getPendingDispatchReservations(
        DISPATCH_BOARD_PAGINATION.FIRST_PAGE
      )
    ).rejects.toBe(authenticationError);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("propagates operations access lookup errors before reading reservations", async () => {
    const { rpc } = createOperationsClient(true, true);
    rpc.mockReset();
    rpc.mockResolvedValueOnce({
      data: null,
      error: {
        code: "XX000",
        message: "Area lookup failed",
      },
    });

    await expect(
      getPendingDispatchReservations(
        DISPATCH_BOARD_PAGINATION.FIRST_PAGE
      )
    ).rejects.toThrow(
      "Supabase query failed: check operations access"
    );
    expect(rpc).toHaveBeenCalledOnce();
  });
});
