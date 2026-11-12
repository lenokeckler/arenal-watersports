import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import type { E2ePredefinedComboFixture } from "../models/E2ePredefinedComboFixture.interface";
import type { PredefinedComboFixtureResources } from "../models/PredefinedComboFixtureResources.interface";
import { createPredefinedComboFixtureCategory } from "./createPredefinedComboFixtureCategory";
import {
  createPredefinedComboFixtureCombo,
  createPredefinedComboFixtureComboItem,
} from "./createPredefinedComboFixtureCombo";
import { createPredefinedComboFixtureWorker } from "./createPredefinedComboFixtureWorker";

export const setupPredefinedComboFixture = async (
  supabase: SupabaseClient<Database>,
  resources: PredefinedComboFixtureResources
): Promise<E2ePredefinedComboFixture> => {
  await createPredefinedComboFixtureWorker(
    supabase,
    resources
  );
  await createPredefinedComboFixtureCategory(
    supabase,
    resources.workerId,
    resources.categoryId,
    resources.categoryName
  );
  await createPredefinedComboFixtureCombo(
    supabase,
    resources.workerId,
    resources.comboId,
    resources.comboName
  );
  await createPredefinedComboFixtureComboItem(
    supabase,
    resources.comboId,
    resources.categoryId
  );
  return {
    categoryName: resources.categoryName,
    comboId: resources.comboId,
    comboName: resources.comboName,
    customerName: resources.customerName,
    workerPassword: resources.workerPassword,
    workerUsername: resources.workerUsername,
  };
};
