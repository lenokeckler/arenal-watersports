import type { createInventoryCategoryFixture } from "../support/createInventoryCategoryFixture";

export type E2eInventoryFixture = Awaited<
  ReturnType<typeof createInventoryCategoryFixture>
>;
