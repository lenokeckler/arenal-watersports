import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { STRING } from "@/app/constants";
import {
  E2E_FIRST_SIGN_IN_PASSWORDS,
  E2E_PENDING_WORKER,
} from "../constants/E2eFirstSignIn.constants";
import { E2E_SUPABASE_CLIENT_OPTIONS } from "../constants/E2eSupabase.constants";
import { createAuthUser } from "./createAuthUser";
import { insertPendingWorker } from "./insertPendingWorker";
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
    const workerId = await createAuthUser(
      supabase,
      username,
      temporaryPassword
    );
    await insertPendingWorker(supabase, workerId, username);
    return {
      remove: () => removePendingWorker(supabase, workerId),
      temporaryPassword,
      username,
    };
  };
