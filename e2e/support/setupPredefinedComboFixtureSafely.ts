import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_PREDEFINED_COMBO_FIXTURE } from "../constants/E2ePredefinedCombo.constants";
import type { E2ePredefinedComboFixture } from "../models/E2ePredefinedComboFixture.interface";
import type { PredefinedComboFixtureResources } from "../models/PredefinedComboFixtureResources.interface";
import { cleanupPredefinedComboFixture } from "./predefinedComboFixtureCleanup";
import { setupPredefinedComboFixture } from "./predefinedComboFixtureSetup";

export const setupPredefinedComboFixtureSafely = async (
  supabase: SupabaseClient<Database>,
  resources: PredefinedComboFixtureResources
): Promise<E2ePredefinedComboFixture> => {
  try {
    return await setupPredefinedComboFixture(
      supabase,
      resources
    );
  } catch (error) {
    try {
      await cleanupPredefinedComboFixture(
        supabase,
        resources
      );
    } catch (cleanupError) {
      throw new AggregateError(
        [error, cleanupError],
        E2E_PREDEFINED_COMBO_FIXTURE.FIXTURE_FAILURE
      );
    }
    throw new Error(
      E2E_PREDEFINED_COMBO_FIXTURE.FIXTURE_FAILURE,
      { cause: error }
    );
  }
};
