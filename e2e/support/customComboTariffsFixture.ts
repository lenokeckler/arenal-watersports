import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_CUSTOM_COMBO_FIXTURE } from "../constants/E2eCustomCombo.constants";
import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import type { E2eCustomComboTariffSnapshot } from "../models/E2eCustomComboTariffSnapshot.interface";

const restoreTariffs = async (
  supabase: SupabaseClient<Database>,
  snapshot: E2eCustomComboTariffSnapshot
): Promise<void> => {
  const { error: deleteError } = await supabase
    .from("tariffs")
    .delete()
    .in("category_id", snapshot.categoryIds);
  if (deleteError) {
    throw new Error(
      E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
    );
  }
  if (snapshot.rows.length === 0) {
    return;
  }
  const { error: restoreError } = await supabase
    .from("tariffs")
    .upsert(snapshot.rows, {
      onConflict: "category_id,type",
    });
  if (restoreError) {
    throw new Error(
      E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
    );
  }
};

const createLocalSupabaseClient =
  (): SupabaseClient<Database> => {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
      );
    }
    let hostname: string;
    try {
      hostname = new URL(supabaseUrl).hostname;
    } catch {
      throw new Error(
        E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
      );
    }
    if (
      !E2E_CUSTOM_COMBO_FIXTURE.LOCAL_HOSTNAMES.some(
        (localHostname) => localHostname === hostname
      )
    ) {
      throw new Error(
        E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
      );
    }
    return createClient<Database>(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  };

const setupCustomComboTariffs = async (): Promise<
  () => Promise<void>
> => {
  const supabase = createLocalSupabaseClient();
  const { data: categories, error: categoryError } =
    await supabase
      .from("equipment_categories")
      .select("id, name, guide_only")
      .in("name", [
        E2E_CUSTOM_COMBO_FIXTURE.REGULAR_CATEGORY_NAME,
        E2E_CUSTOM_COMBO_FIXTURE.GUIDE_ONLY_CATEGORY_NAME,
      ])
      .eq("is_reservable", true)
      .eq("status", "active");
  if (categoryError || !categories) {
    throw new Error(
      E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
    );
  }
  const regularCategory = categories.find(
    ({ name }) =>
      name ===
      E2E_CUSTOM_COMBO_FIXTURE.REGULAR_CATEGORY_NAME
  );
  const guideOnlyCategory = categories.find(
    ({ name }) =>
      name ===
      E2E_CUSTOM_COMBO_FIXTURE.GUIDE_ONLY_CATEGORY_NAME
  );
  if (
    !regularCategory ||
    regularCategory.guide_only ||
    !guideOnlyCategory?.guide_only
  ) {
    throw new Error(
      E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
    );
  }
  const { data: worker, error: workerError } =
    await supabase
      .from("workers")
      .select("id")
      .eq("username", E2E_LOGIN_ACCOUNT.USERNAME)
      .single();
  if (workerError || !worker) {
    throw new Error(
      E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
    );
  }
  const categoryIds = [
    regularCategory.id,
    guideOnlyCategory.id,
  ];
  const { data: originalTariffs, error: tariffError } =
    await supabase
      .from("tariffs")
      .select("*")
      .in("category_id", categoryIds);
  if (tariffError || !originalTariffs) {
    throw new Error(
      E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
    );
  }
  const snapshot: E2eCustomComboTariffSnapshot = {
    categoryIds,
    rows: originalTariffs,
  };
  const fixtureTariffs = [
    {
      amount_crc:
        E2E_CUSTOM_COMBO_FIXTURE.RENTAL_TARIFF.amountCrc,
      amount_usd:
        E2E_CUSTOM_COMBO_FIXTURE.RENTAL_TARIFF.amountUsd,
      category_id: regularCategory.id,
      created_by: worker.id,
      type: E2E_CUSTOM_COMBO_FIXTURE.RENTAL_TARIFF.type,
      updated_by: worker.id,
    },
    {
      amount_crc:
        E2E_CUSTOM_COMBO_FIXTURE.TOUR_TARIFF.amountCrc,
      amount_usd:
        E2E_CUSTOM_COMBO_FIXTURE.TOUR_TARIFF.amountUsd,
      category_id: guideOnlyCategory.id,
      created_by: worker.id,
      type: E2E_CUSTOM_COMBO_FIXTURE.TOUR_TARIFF.type,
      updated_by: worker.id,
    },
  ];
  const { error: fixtureError } = await supabase
    .from("tariffs")
    .upsert(fixtureTariffs, {
      onConflict: "category_id,type",
    });
  if (fixtureError) {
    await restoreTariffs(supabase, snapshot);
    throw new Error(
      E2E_CUSTOM_COMBO_FIXTURE.FIXTURE_FAILURE
    );
  }
  return async (): Promise<void> => {
    try {
      await restoreTariffs(supabase, snapshot);
    } finally {
      await supabase.removeAllChannels();
    }
  };
};

export default setupCustomComboTariffs;
