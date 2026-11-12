import { SUPABASE_RPC } from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { normalizeUsername } from "@/app/utils/username/normalizeUsername";
import type { IssuedPasswordResetPin } from "./models/IssuedPasswordResetPin.interface";
import type { IssuePasswordResetPinInput } from "./models/IssuePasswordResetPinInput.interface";

export const issuePasswordResetPin = async ({
  username,
  pin,
  networkKey,
}: IssuePasswordResetPinInput): Promise<
  NullableRef<IssuedPasswordResetPin>
> => {
  const { data, error } =
    await createServiceRoleSupabaseClient().rpc(
      SUPABASE_RPC.ISSUE_PASSWORD_RESET_PIN,
      {
        p_network_key: networkKey,
        p_pin: pin,
        p_username: normalizeUsername(username),
      }
    );

  throwIfSupabaseError(
    error,
    SUPABASE_RPC.ISSUE_PASSWORD_RESET_PIN
  );

  const [row] = data ?? [];

  return row
    ? {
        lifetimeMinutes: row.lifetime_minutes,
        personalEmail: row.personal_email,
        pinId: row.pin_id,
      }
    : null;
};
