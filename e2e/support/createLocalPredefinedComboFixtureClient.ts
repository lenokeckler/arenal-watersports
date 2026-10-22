import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "@/app/constants";
import type { Database } from "@/app/types";
import { E2E_PREDEFINED_COMBO_FIXTURE } from "../constants/E2ePredefinedCombo.constants";

export const createLocalPredefinedComboFixtureClient =
  () => {
    let hostname: string;
    try {
      hostname = new URL(SUPABASE.URL).hostname;
    } catch {
      throw new Error(
        E2E_PREDEFINED_COMBO_FIXTURE.FIXTURE_FAILURE
      );
    }
    if (
      !E2E_PREDEFINED_COMBO_FIXTURE.LOCAL_HOSTNAMES.includes(
        hostname as (typeof E2E_PREDEFINED_COMBO_FIXTURE.LOCAL_HOSTNAMES)[number]
      ) ||
      !SUPABASE.SERVICE_ROLE_KEY
    ) {
      throw new Error(
        E2E_PREDEFINED_COMBO_FIXTURE.FIXTURE_FAILURE
      );
    }

    return createClient<Database>(
      SUPABASE.URL,
      SUPABASE.SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  };
