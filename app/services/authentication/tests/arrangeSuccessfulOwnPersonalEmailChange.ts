import { vi } from "vitest";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readOwnPersonalEmail } from "../readOwnPersonalEmail";
import { reauthenticateSettledWorker } from "../reauthenticateSettledWorker";
import { updateOwnPersonalEmail } from "../updateOwnPersonalEmail";
import { ALREADY_CHANGED_WORKER } from "./firstSignIn.constants";
import { OPTIONAL_OWN_PERSONAL_EMAIL } from "./ownPersonalEmail.constants";
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
    vi.mocked(readOwnPersonalEmail).mockResolvedValue(
      OPTIONAL_OWN_PERSONAL_EMAIL
    );
    vi.mocked(updateOwnPersonalEmail).mockResolvedValue(
      undefined
    );
  };
