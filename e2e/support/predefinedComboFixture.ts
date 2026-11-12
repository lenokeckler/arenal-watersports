import { createLocalPredefinedComboFixtureClient } from "./createLocalPredefinedComboFixtureClient";
import { createPredefinedComboFixtureResources } from "./createPredefinedComboFixtureResources";
import { cleanupPredefinedComboFixture } from "./predefinedComboFixtureCleanup";
import { setupPredefinedComboFixtureSafely } from "./setupPredefinedComboFixtureSafely";

export const createPredefinedComboFixture = (
  fixtureLabel: string
) => {
  const supabase =
    createLocalPredefinedComboFixtureClient();
  const resources =
    createPredefinedComboFixtureResources(fixtureLabel);
  return {
    cleanup: () =>
      cleanupPredefinedComboFixture(supabase, resources),
    setup: () =>
      setupPredefinedComboFixtureSafely(
        supabase,
        resources
      ),
  };
};
