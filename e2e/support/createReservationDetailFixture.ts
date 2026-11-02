import { randomUUID } from "node:crypto";
import { E2E_RESERVATION_DETAIL_FIXTURE as fixture } from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixture } from "../models/ReservationDetailFixture.interface";
import type { ReservationDetailFixtureCatalog } from "../models/ReservationDetailFixtureCatalog.interface";
import type { ReservationDetailFixtureResources } from "../models/ReservationDetailFixtureResources.interface";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { deleteReservationDetailFixture } from "./deleteReservationDetailFixture";
import { insertReservationDetailFixture } from "./insertReservationDetailFixture";
import { loadReservationDetailFixtureCatalog } from "./loadReservationDetailFixtureCatalog";

const createFixtureResources = (
  catalog: ReservationDetailFixtureCatalog
): ReservationDetailFixtureResources => ({
  createdById: catalog.createdById,
  extraId: catalog.extraId,
  firstCategoryId: catalog.firstCategoryId,
  firstDispatchId: randomUUID(),
  firstUnitId: catalog.firstUnitId,
  guideId: catalog.guideId,
  reservationId: randomUUID(),
  secondDispatchId: randomUUID(),
  secondCategoryId: catalog.secondCategoryId,
  secondUnitId: catalog.secondUnitId,
});

const createFixtureCustomerName = (
  reservationId: string
): string =>
  `${fixture.CUSTOMER_PREFIX} ${reservationId.slice(0, fixture.CUSTOMER_ID_PREFIX_LENGTH)}`;

const insertFixtureWithCleanup = async (
  supabase: ReturnType<
    typeof createServiceRoleSupabaseClient
  >,
  resources: ReservationDetailFixtureResources,
  customerName: string
): Promise<void> => {
  try {
    await insertReservationDetailFixture(
      supabase,
      resources,
      customerName
    );
  } catch (error) {
    await deleteReservationDetailFixture(
      supabase,
      resources.reservationId
    );
    throw error;
  }
};

const createFixtureCleanup =
  (
    supabase: ReturnType<
      typeof createServiceRoleSupabaseClient
    >,
    reservationId: string
  ): (() => Promise<void>) =>
  async (): Promise<void> => {
    try {
      await deleteReservationDetailFixture(
        supabase,
        reservationId
      );
    } finally {
      await supabase.removeAllChannels();
    }
  };

const mapFixture = (
  catalog: ReservationDetailFixtureCatalog,
  resources: ReservationDetailFixtureResources,
  customerName: string,
  cleanup: () => Promise<void>
): ReservationDetailFixture => ({
  cleanup,
  customerName,
  createdByName: catalog.createdByName,
  firstCategoryName: fixture.FIRST_CATEGORY_NAME,
  guideName: catalog.guideName,
  id: resources.reservationId,
  secondCategoryName: fixture.SECOND_CATEGORY_NAME,
});

export const createReservationDetailFixture =
  async (): Promise<ReservationDetailFixture> => {
    const supabase = createServiceRoleSupabaseClient();
    const catalog =
      await loadReservationDetailFixtureCatalog(supabase);
    const resources = createFixtureResources(catalog);
    const customerName = createFixtureCustomerName(
      resources.reservationId
    );
    await insertFixtureWithCleanup(
      supabase,
      resources,
      customerName
    );
    return mapFixture(
      catalog,
      resources,
      customerName,
      createFixtureCleanup(
        supabase,
        resources.reservationId
      )
    );
  };
