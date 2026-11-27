import type { createComboListPage } from "../pages/ComboList.page";
import type { ComboSeedInput } from "./ComboSeedInput.interface";
import type { SeededCombo } from "./SeededCombo.interface";

export interface ComboListFixtures {
  listPage: ReturnType<typeof createComboListPage>;
  seedCombo: (
    overrides?: Partial<ComboSeedInput>
  ) => Promise<SeededCombo>;
  seedSoldCombo: (
    overrides?: Partial<ComboSeedInput>
  ) => Promise<SeededCombo>;
}
