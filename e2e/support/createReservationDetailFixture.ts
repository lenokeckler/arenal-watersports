import { randomUUID } from "node:crypto";
import {
  E2E_RESERVATION_DETAIL_FIXTURE as fixture,
  E2E_RESERVATION_DETAIL_VALUES as values,
} from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixture } from "../models/ReservationDetailFixture.interface";
import type { ReservationDetailFixtureCatalog } from "../models/ReservationDetailFixtureCatalog.interface";
import type { ReservationDetailFixtureResources } from "../models/ReservationDetailFixtureResources.interface";
import type { ReservationDetailFixtureAuthWorker } from "../models/ReservationDetailFixtureAuthWorker.interface";
import { createLocalPredefinedComboFixtureClient } from "./createLocalPredefinedComboFixtureClient";
import { ensureReservationDetailFixtureWrite } from "./ensureReservationDetailFixtureWrite";
import { deleteReservationDetailFixture } from "./deleteReservationDetailFixture";
import { deleteReservationDetailFixtureWorker } from "./deleteReservationDetailFixtureWorker";
import { createReservationDetailFixtureWorker } from "./createReservationDetailFixtureWorker";
import { insertReservationDetailFixture } from "./insertReservationDetailFixture";
import { loadReservationDetailFixtureCatalog } from "./loadReservationDetailFixtureCatalog";

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
    typeof createLocalPredefinedComboFixtureClient
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
      typeof createLocalPredefinedComboFixtureClient
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
    typeof createLocalPredefinedComboFixtureClient
  >,
  catalog: ReservationDetailFixtureCatalog,
  resources: ReservationDetailFixtureResources,
  customerName: string,
  worker: ReservationDetailFixtureAuthWorker,
  cleanup: () => Promise<void>
): ReservationDetailFixture => {
  let splitChildId: string | null = null;

  return {
    cancel: async (): Promise<void> => {
      const { error } = await supabase
        .from("reservations")
        .update({
          cancellation_reason: fixture.CANCELLATION_REASON,
          status: "cancelled",
        })
        .eq("id", resources.reservationId);
      ensureReservationDetailFixtureWrite(error);
    },
    cleanup: async (): Promise<void> => {
      if (splitChildId !== null) {
        await deleteReservationDetailFixture(
          supabase,
          splitChildId
        );
      }
      await cleanup();
    },
    clearDetails: async (): Promise<void> => {
      const tables = [
        "refunds",
        "reservation_charges",
        "reservation_items",
        "reservation_guides",
        "reservation_dispatches",
        "reservation_pricing",
      ] as const;

      for (const table of tables) {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq("reservation_id", resources.reservationId);
        ensureReservationDetailFixtureWrite(error);
      }
    },
    createSplitChild: async (): Promise<string> => {
      splitChildId = randomUUID();
      const { error } = await supabase
        .from("reservations")
        .insert({
          created_by: resources.createdById,
          customer_name: customerName,
          duration_minutes:
            fixture.RESERVATION_DURATION_MINUTES,
          id: splitChildId,
          parent_reservation_id: resources.reservationId,
          people_count: fixture.PEOPLE_COUNT,
          starts_at: fixture.RESERVATION_START,
          type: values.RESERVATION_TYPE.TOUR,
          updated_by: resources.createdById,
        });
      ensureReservationDetailFixtureWrite(error);
      return splitChildId;
    },
    customerName,
    createdByName: fixture.WORKER_NAME,
    firstCategoryName: fixture.FIRST_CATEGORY_NAME,
    guideName: catalog.guideName,
    id: resources.reservationId,
    secondCategoryName: fixture.SECOND_CATEGORY_NAME,
    workerPassword: worker.password,
    workerUsername: worker.username,
  };
};

export const createReservationDetailFixture =
  async (): Promise<ReservationDetailFixture> => {
    const supabase =
      createLocalPredefinedComboFixtureClient();
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
