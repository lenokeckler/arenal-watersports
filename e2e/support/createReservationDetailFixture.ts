import { randomUUID } from "node:crypto";
import { E2E_RESERVATION_DETAIL_FIXTURE as fixture } from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixture } from "../models/ReservationDetailFixture.interface";
import type { ReservationDetailFixtureCatalog } from "../models/ReservationDetailFixtureCatalog.interface";
import type { ReservationDetailFixtureResources } from "../models/ReservationDetailFixtureResources.interface";
import type { ReservationDetailFixtureAuthWorker } from "../models/ReservationDetailFixtureAuthWorker.interface";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { createReservationDetailFixtureWorker } from "./createReservationDetailFixtureWorker";
import { deleteReservationDetailFixture } from "./deleteReservationDetailFixture";
import { deleteReservationDetailFixtureWorker } from "./deleteReservationDetailFixtureWorker";
import { insertReservationDetailFixture } from "./insertReservationDetailFixture";
import { loadReservationDetailFixtureCatalog } from "./loadReservationDetailFixtureCatalog";
import { ensureReservationDetailFixtureWrite } from "./ensureReservationDetailFixtureWrite";

const createFixtureResources = (
  catalog: ReservationDetailFixtureCatalog,
  workerId: string
): ReservationDetailFixtureResources => ({
  createdById: workerId,
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
    reservationId: string,
    worker: ReservationDetailFixtureAuthWorker
  ): (() => Promise<void>) =>
  async (): Promise<void> => {
    try {
      await deleteReservationDetailFixture(
        supabase,
        reservationId
      );
    } finally {
      try {
        await deleteReservationDetailFixtureWorker(
          supabase,
          worker
        );
      } finally {
        await supabase.removeAllChannels();
      }
    }
  };

const mapFixture = (
  supabase: ReturnType<
    typeof createServiceRoleSupabaseClient
  >,
  catalog: ReservationDetailFixtureCatalog,
  resources: ReservationDetailFixtureResources,
  customerName: string,
  worker: ReservationDetailFixtureAuthWorker,
  cleanup: () => Promise<void>
): ReservationDetailFixture => ({
  cancel: async (): Promise<void> => {
    const { error } = await supabase
      .from("reservations")
      .update({
        cancellation_reason: fixture.CANCELLATION_REASON,
        status: fixture.CANCELLED_STATUS,
      })
      .eq("id", resources.reservationId);
    ensureReservationDetailFixtureWrite(error);
  },
  cleanup,
  customerName,
  createdByName: fixture.WORKER_NAME,
  firstCategoryName: fixture.FIRST_CATEGORY_NAME,
  guideName: catalog.guideName,
  id: resources.reservationId,
  secondCategoryName: fixture.SECOND_CATEGORY_NAME,
  workerPassword: worker.password,
  workerUsername: worker.username,
});

export const createReservationDetailFixture =
  async (): Promise<ReservationDetailFixture> => {
    const supabase = createServiceRoleSupabaseClient();
    const catalog =
      await loadReservationDetailFixtureCatalog(supabase);
    const workerId = randomUUID();
    const workerToken = workerId
      .replaceAll("-", "")
      .slice(0, fixture.WORKER_USERNAME_TOKEN_LENGTH);
    const worker: ReservationDetailFixtureAuthWorker = {
      email: `${fixture.WORKER_USERNAME_PREFIX}${workerToken}${fixture.WORKER_EMAIL_DOMAIN}`,
      id: workerId,
      password: fixture.WORKER_PASSWORD,
      username: `${fixture.WORKER_USERNAME_PREFIX}${workerToken}`,
    };
    const resources = createFixtureResources(
      catalog,
      worker.id
    );
    const customerName = createFixtureCustomerName(
      resources.reservationId
    );
    await createReservationDetailFixtureWorker(
      supabase,
      worker,
      catalog.createdById
    );
    try {
      await insertFixtureWithCleanup(
        supabase,
        resources,
        customerName
      );
    } catch (error) {
      await deleteReservationDetailFixtureWorker(
        supabase,
        worker
      );
      throw error;
    }
    return mapFixture(
      supabase,
      catalog,
      resources,
      customerName,
      worker,
      createFixtureCleanup(
        supabase,
        resources.reservationId,
        worker
      )
    );
  };
