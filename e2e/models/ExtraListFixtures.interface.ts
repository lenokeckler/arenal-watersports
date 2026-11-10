import type { createExtraListPage } from "../pages/ExtraList.page";
import type { ExtraSeedInput } from "./ExtraSeedInput.interface";
import type { SeededExtra } from "./SeededExtra.interface";

export interface ExtraListFixtures {
  listPage: ReturnType<typeof createExtraListPage>;
  seedExtra: (
    overrides?: Partial<ExtraSeedInput>
  ) => Promise<SeededExtra>;
}
