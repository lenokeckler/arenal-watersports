import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { reauthenticateSettledWorker } from "../reauthenticateSettledWorker";
import { updateOwnPersonalEmail } from "../updateOwnPersonalEmail";
import { ALREADY_CHANGED_WORKER } from "./firstSignIn.constants";
import { SUPABASE_CLIENT } from "./supabaseClient.constants";

export const arrangeSuccessfulOwnPersonalEmailChange =
  (): void => {
    vi.resetAllMocks();
    vi.mocked(createServerSupabaseClient).mockResolvedValue(
      SUPABASE_CLIENT as never
    );
    vi.mocked(
      reauthenticateSettledWorker
    ).mockResolvedValue({
      ok: true,
      worker: ALREADY_CHANGED_WORKER,
    });
    vi.mocked(updateOwnPersonalEmail).mockResolvedValue(
      undefined
    );
  };
