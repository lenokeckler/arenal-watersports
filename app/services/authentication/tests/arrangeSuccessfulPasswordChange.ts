import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readFirstSignInWorker } from "../readFirstSignInWorker";
import { updateSignedInPassword } from "../updateSignedInPassword";
import { verifyTemporaryPassword } from "../verifyTemporaryPassword";
import { FIRST_SIGN_IN_WORKER } from "./firstSignIn.constants";

export const SUPABASE_CLIENT = {};

export const arrangeSuccessfulPasswordChange = (): void => {
  vi.resetAllMocks();
  vi.mocked(createServerSupabaseClient).mockResolvedValue(
    SUPABASE_CLIENT as never
  );
  vi.mocked(readFirstSignInWorker).mockResolvedValue(
    FIRST_SIGN_IN_WORKER
  );
  vi.mocked(verifyTemporaryPassword).mockResolvedValue(
    null
  );
  vi.mocked(updateSignedInPassword).mockResolvedValue(null);
};
