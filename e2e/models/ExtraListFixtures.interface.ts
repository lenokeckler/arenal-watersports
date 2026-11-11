import type { createExtraListPage } from "../pages/ExtraList.page";
import type { ExtraSeedInput } from "./ExtraSeedInput.interface";
import type { SeededExtra } from "./SeededExtra.interface";
import type { SeededUsedExtra } from "./SeededUsedExtra.interface";

export interface ExtraListFixtures {
  listPage: ReturnType<typeof createExtraListPage>;
  seedExtra: (
    overrides?: Partial<ExtraSeedInput>
  ) => Promise<SeededExtra>;
  seedUsedExtra: (
    overrides?: Partial<ExtraSeedInput>
  ) => Promise<SeededUsedExtra>;
}
