import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { normalizePasswordResetPin } from "@/app/utils/password-recovery/normalizePasswordResetPin";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { normalizeUsername } from "@/app/utils/username/normalizeUsername";
import type { ConsumePasswordResetPinInput } from "./models/ConsumePasswordResetPinInput.interface";

export const consumePasswordResetPin = async ({
  username,
  pin,
}: ConsumePasswordResetPinInput): Promise<
  NullableRef<string>
> => {
  const { data, error } =
    await createServiceRoleSupabaseClient().rpc(
      SUPABASE_RPC.CONSUME_PASSWORD_RESET_PIN,
      {
        p_pin: normalizePasswordResetPin(pin),
        p_username: normalizeUsername(username),
      }
    );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.CONSUME_PASSWORD_RESET_PIN
  );

  return data;
};
