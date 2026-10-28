import type { NullableRef } from "@/app/types";
import { SUPABASE_RPC } from "@/app/constants";
import { E2E_PIN_CONSUMPTION_ERROR } from "../constants/E2ePasswordRecoveryReset.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

const consumeOnce = async (
  username: string,
  pin: string
): Promise<NullableRef<string>> => {
  const { data, error } =
    await createServiceRoleClient().rpc(
      SUPABASE_RPC.CONSUME_PASSWORD_RESET_PIN,
      { p_pin: pin, p_username: username }
    );

  if (error) {
    return failE2eOperation(
      E2E_PIN_CONSUMPTION_ERROR.OPERATION,
      error.message
    );
  }

  return data;
};

export const consumeRecoveryPinConcurrently = (
  username: string,
  pin: string
): Promise<NullableRef<string>[]> =>
  Promise.all([
    consumeOnce(username, pin),
    consumeOnce(username, pin),
  ]);
