import type { ComboFormFixtures } from "../models/ComboFormFixtures.interface";
import { createComboFormPage } from "../pages/ComboForm.page";
import { removeCombosNamed } from "./comboFixtures";
import { test as comboListTest } from "./comboListTest";
import { logInAsAdmin } from "./logInAsAdmin";

export const test = comboListTest.extend<
  Pick<
    ComboFormFixtures,
    "formPage" | "trackCreatedComboName"
  >
>({
  formPage: async ({ page }, provide) => {
    await logInAsAdmin(page);

    await provide(createComboFormPage(page));
  },
  trackCreatedComboName: async (
    { formPage: _formPage },
    provide
  ) => {
    const createdNames: string[] = [];

    await provide((name) => {
      createdNames.push(name);
    });

    await removeCombosNamed(createdNames);
  },
});
