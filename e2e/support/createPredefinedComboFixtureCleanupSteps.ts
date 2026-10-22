import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import type { PredefinedComboFixtureResources } from "../models/PredefinedComboFixtureResources.interface";
import {
  deletePredefinedComboCategory,
  deletePredefinedComboRecords,
} from "./deletePredefinedComboRecords";
import { deletePredefinedComboFixtureWorker } from "./deletePredefinedComboFixtureWorker";
import { deletePredefinedComboReservations } from "./deletePredefinedComboReservations";

export const createPredefinedComboFixtureCleanupSteps = (
  supabase: SupabaseClient<Database>,
  resources: PredefinedComboFixtureResources
) => [
  () =>
    deletePredefinedComboReservations(
      supabase,
      resources.customerName
    ),
  () =>
    deletePredefinedComboRecords(
      supabase,
      resources.comboId
    ),
  () =>
    deletePredefinedComboCategory(
      supabase,
      resources.categoryId
    ),
  () =>
    deletePredefinedComboFixtureWorker(supabase, resources),
];
