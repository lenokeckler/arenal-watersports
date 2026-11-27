import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { DEPOSIT_RESOLUTION_ERROR } from "../constants/DepositResolutionError.constants";
import { DEPOSIT_RESOLUTION_QUERY } from "../constants/DepositResolutionQuery.constants";
import type { DepositResolutionCommand } from "../models/DepositResolutionCommand.interface";
import type { DepositResolutionRecorded } from "../models/DepositResolutionRecorded.interface";
import { mapDepositResolutionRecorded } from "../utils/mapDepositResolutionRecorded";

const { PAYLOAD_KEY } = DEPOSIT_RESOLUTION_QUERY;

export const recordDepositResolution = async (
  command: DepositResolutionCommand
): Promise<DepositResolutionRecorded> => {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    DEPOSIT_RESOLUTION_QUERY.RPC.RESOLVE,
    {
      [PAYLOAD_KEY.PAYLOAD]: {
        [PAYLOAD_KEY.DEPOSIT_ID]: command.depositId,
        [PAYLOAD_KEY.REASON]: command.reason,
        [PAYLOAD_KEY.RETURNED_AMOUNT]:
          command.returnedAmount,
      },
    }
  );

  throwIfSupabaseError(
    error,
    DEPOSIT_RESOLUTION_ERROR.OPERATION.RESOLVE
  );

  const [row] = data ?? [];

  if (!row) {
    throw new Error(
      DEPOSIT_RESOLUTION_ERROR.OPERATION.MISSING_RESOLUTION
    );
  }

  return mapDepositResolutionRecorded(row);
};
