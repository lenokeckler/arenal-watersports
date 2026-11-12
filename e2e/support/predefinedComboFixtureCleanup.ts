import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_PREDEFINED_COMBO_FIXTURE } from "../constants/E2ePredefinedCombo.constants";
import type { PredefinedComboFixtureResources } from "../models/PredefinedComboFixtureResources.interface";
import { createPredefinedComboFixtureCleanupSteps } from "./createPredefinedComboFixtureCleanupSteps";

export const cleanupPredefinedComboFixture = async (
  supabase: SupabaseClient<Database>,
  resources: PredefinedComboFixtureResources
): Promise<void> => {
  const cleanupSteps =
    createPredefinedComboFixtureCleanupSteps(
      supabase,
      resources
    );
  const errors: unknown[] = [];
  for (const cleanupStep of cleanupSteps) {
    try {
      errors.push(...(await cleanupStep()));
    } catch (error) {
      errors.push(error);
    }
  }
  try {
    await supabase.removeAllChannels();
  } catch (error) {
    errors.push(error);
  }
  if (errors.length > 0) {
    throw new AggregateError(
      errors,
      E2E_PREDEFINED_COMBO_FIXTURE.FIXTURE_FAILURE
    );
  }
};
