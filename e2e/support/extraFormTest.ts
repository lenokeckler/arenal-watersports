import type { ExtraFormFixtures } from "../models/ExtraFormFixtures.interface";
import { createExtraFormPage } from "../pages/ExtraForm.page";
import { removeExtrasNamed } from "./extraFixtures";
import { test as extraListTest } from "./extraListTest";
import { logInAsAdmin } from "./logInAsAdmin";

export const test = extraListTest.extend<
  Pick<
    ExtraFormFixtures,
    "formPage" | "trackCreatedExtraName"
  >
>({
  formPage: async ({ page }, provide) => {
    await logInAsAdmin(page);

    await provide(createExtraFormPage(page));
  },
  trackCreatedExtraName: async (
    { formPage: _formPage },
    provide
  ) => {
    const createdNames: string[] = [];

    await provide((name) => {
      createdNames.push(name);
    });

    await removeExtrasNamed(createdNames);
  },
});
