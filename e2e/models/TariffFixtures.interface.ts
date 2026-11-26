import type { createTariffFormPage } from "../pages/TariffForm.page";
import type { createTariffListPage } from "../pages/TariffList.page";
import type { SeededTariffCategory } from "./SeededTariffCategory.interface";
import type { TariffSeedInput } from "./TariffSeedInput.interface";

export interface TariffFixtures {
  formPage: ReturnType<typeof createTariffFormPage>;
  listPage: ReturnType<typeof createTariffListPage>;
  seedTariffCategory: (
    overrides?: Partial<TariffSeedInput>
  ) => Promise<SeededTariffCategory>;
}
