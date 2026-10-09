import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { checkWorkerPassword } from "../checkWorkerPassword";
import { readSignedInWorker } from "../readSignedInWorker";
import { updateSignedInPassword } from "../updateSignedInPassword";
import { FIRST_SIGN_IN_WORKER } from "./firstSignIn.constants";

export const SUPABASE_CLIENT = {};

export const arrangeSuccessfulPasswordChange = (): void => {
  vi.resetAllMocks();
  vi.mocked(createServerSupabaseClient).mockResolvedValue(
    SUPABASE_CLIENT as never
  );
  vi.mocked(readSignedInWorker).mockResolvedValue(
    FIRST_SIGN_IN_WORKER
  );
  vi.mocked(checkWorkerPassword).mockResolvedValue(null);
  vi.mocked(updateSignedInPassword).mockResolvedValue(null);
};
