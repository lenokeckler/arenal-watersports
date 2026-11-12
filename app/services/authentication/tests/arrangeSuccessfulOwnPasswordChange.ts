import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readSignedInWorker } from "../readSignedInWorker";
import { signOutEverywhere } from "../signOutEverywhere";
import { updateOwnPassword } from "../updateOwnPassword";
import { verifyCurrentPassword } from "../verifyCurrentPassword";
import { SUPABASE_CLIENT } from "./supabaseClient.constants";
import { ALREADY_CHANGED_WORKER } from "./firstSignIn.constants";

export const arrangeSuccessfulOwnPasswordChange =
  (): void => {
    vi.resetAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      SUPABASE_CLIENT as never
    );
    vi.mocked(readSignedInWorker).mockResolvedValue(
      ALREADY_CHANGED_WORKER
    );
    vi.mocked(verifyCurrentPassword).mockResolvedValue(
      null
    );
    vi.mocked(updateOwnPassword).mockResolvedValue(null);
    vi.mocked(signOutEverywhere).mockResolvedValue(
      undefined
    );
  };
