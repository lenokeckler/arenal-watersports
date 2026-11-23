import type { BoardPendingDispatch } from "./models/BoardPendingDispatch.interface";
import { getPendingDispatchCount } from "./getPendingDispatchCount";
import { OperationsAccessError } from "./getOperationsSupabaseClient";

const HIDDEN_PENDING_DISPATCH: BoardPendingDispatch = {
  count: null,
  isVisible: false,
};

export const getBoardPendingDispatch =
  async (): Promise<BoardPendingDispatch> => {
    try {
      return {
        count: await getPendingDispatchCount(),
        isVisible: true,
      };
    } catch (error: unknown) {
      return error instanceof OperationsAccessError
        ? HIDDEN_PENDING_DISPATCH
        : { count: null, isVisible: true };
    }
  };
