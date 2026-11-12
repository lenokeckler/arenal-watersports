import type { createExtraFormPage } from "../pages/ExtraForm.page";
import type { ExtraListFixtures } from "./ExtraListFixtures.interface";

export interface ExtraFormFixtures extends ExtraListFixtures {
  formPage: ReturnType<typeof createExtraFormPage>;
  trackCreatedExtraName: (name: string) => void;
}
