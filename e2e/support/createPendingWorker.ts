import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { STRING } from "@/app/constants";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import {
  E2E_FIRST_SIGN_IN_PASSWORDS,
  E2E_PENDING_WORKER,
} from "../constants/E2eFirstSignIn.constants";
import {
  E2E_SUPABASE_CLIENT_OPTIONS,
  E2E_SUPABASE_ERROR,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { PendingWorker } from "./models/PendingWorker.interface";
import { readLocalSupabaseEnvironment } from "./readLocalSupabaseEnvironment";
import { removePendingWorker } from "./removePendingWorker";

const buildUsername = (): string =>
  `${E2E_PENDING_WORKER.USERNAME_PREFIX}${randomUUID()
    .replaceAll("-", STRING.Empty)
    .slice(0, E2E_PENDING_WORKER.USERNAME_SUFFIX_LENGTH)}`;

export const createPendingWorker =
  async (): Promise<PendingWorker> => {
    const { serviceRoleKey, url } =
      readLocalSupabaseEnvironment();
    const supabase = createClient(
      url,
      serviceRoleKey,
      E2E_SUPABASE_CLIENT_OPTIONS
    );
    const username = buildUsername();
    const temporaryPassword =
      E2E_FIRST_SIGN_IN_PASSWORDS.TEMPORARY;

    const { data, error: createUserError } =
      await supabase.auth.admin.createUser({
        email: toAuthEmail(username),
        email_confirm: true,
        password: temporaryPassword,
      });

    if (createUserError) {
      return failE2eOperation(
        "create the auth user",
        createUserError.message
      );
    }

    const workerId = data.user.id;

    const { error: insertError } = await supabase
      .from(E2E_SUPABASE_TABLE.WORKERS)
      .insert({
        base_role: E2E_PENDING_WORKER.BASE_ROLE,
        full_name: E2E_PENDING_WORKER.FULL_NAME,
        id: workerId,
        must_change_password: true,
        username,
      });

    if (insertError) {
      const { error: rollbackError } =
        await supabase.auth.admin.deleteUser(workerId);
      const reasons = [
        insertError.message,
        rollbackError?.message,
      ].filter(Boolean);

      return failE2eOperation(
        "insert the pending worker",
        reasons.join(E2E_SUPABASE_ERROR.REASON_SEPARATOR)
      );
    }

    return {
      remove: () => removePendingWorker(supabase, workerId),
      temporaryPassword,
      username,
    };
  };
