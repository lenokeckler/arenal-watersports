import type { Page } from "@playwright/test";
import { test as base } from "./activeWorkerTest";
import { createDispatchSheetFixture } from "./createDispatchSheetFixture";
import type { DispatchSheetFixture } from "./models/DispatchSheetFixture.interface";
import { signInAsSeededWorker } from "./signInAsSeededWorker";

export const test = base.extend<{
  administratorPage: Page;
  boardDispatchSheet: DispatchSheetFixture;
  boardMotorDispatchSheet: DispatchSheetFixture;
  dispatchSheet: DispatchSheetFixture;
  motorDispatchSheet: DispatchSheetFixture;
}>({
  administratorPage: async ({ page }, provide) => {
    await signInAsSeededWorker(page);
    await provide(page);
  },
  boardDispatchSheet: async ({ activeWorker }, provide) => {
    const fixture = await createDispatchSheetFixture(
      activeWorker.id,
      { isOnBoard: true }
    );

    await provide(fixture);
    await fixture.remove();
  },
  boardMotorDispatchSheet: async (
    { activeWorker },
    provide
  ) => {
    const fixture = await createDispatchSheetFixture(
      activeWorker.id,
      { hasMotor: true, isOnBoard: true }
    );

    await provide(fixture);
    await fixture.remove();
  },
  dispatchSheet: async ({ activeWorker }, provide) => {
    const fixture = await createDispatchSheetFixture(
      activeWorker.id
    );

    await provide(fixture);
    await fixture.remove();
  },
  motorDispatchSheet: async ({ activeWorker }, provide) => {
    const fixture = await createDispatchSheetFixture(
      activeWorker.id,
      { hasMotor: true }
    );

    await provide(fixture);
    await fixture.remove();
  },
});

export { expect } from "./activeWorkerTest";
