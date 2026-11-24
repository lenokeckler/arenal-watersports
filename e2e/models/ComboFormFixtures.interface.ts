import type { createComboFormPage } from "../pages/ComboForm.page";
import type { ComboListFixtures } from "./ComboListFixtures.interface";

export interface ComboFormFixtures extends ComboListFixtures {
  formPage: ReturnType<typeof createComboFormPage>;
  trackCreatedComboName: (name: string) => void;
}
