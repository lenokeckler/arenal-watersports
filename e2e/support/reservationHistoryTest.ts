import { E2E_LOGIN_ACCOUNT } from "../constants/E2eLogin.constants";
import {
  E2E_RESERVATION_HISTORY,
  E2E_RESERVATION_HISTORY_STATUS,
} from "../constants/E2eReservationHistory.constants";
import { test as base } from "./activeWorkerTest";
import { createReservationHistoryRecord } from "./createReservationHistoryRecord";
import type { E2eReservationHistoryRecord } from "./models/E2eReservationHistoryRecord.interface";
import type { ReservationHistoryTestFixtures } from "./models/ReservationHistoryTestFixtures.interface";
import { readWorkerIdByUsername } from "./readWorkerIdByUsername";

export const test =
  base.extend<ReservationHistoryTestFixtures>({
    createHistoryRecord: async (
      { activeWorker },
      provide
    ) => {
      const records: E2eReservationHistoryRecord[] = [];
      const adminId = await readWorkerIdByUsername(
        E2E_LOGIN_ACCOUNT.USERNAME
      );

      await provide(
        async ({
          label,
          status = E2E_RESERVATION_HISTORY_STATUS.CLOSED,
          ...details
        }) => {
          const record =
            await createReservationHistoryRecord({
              ...details,
              creatorId: activeWorker.id,
              customerName: `${E2E_RESERVATION_HISTORY.CUSTOMER_PREFIX}-${activeWorker.username}-${label ?? status}`,
              guideId: adminId,
              status,
              updaterId: adminId,
            });

          records.push(record);

          return record;
        }
      );
      await Promise.all(
        records.map((record) => record.remove())
      );
    },
    createHistoryRecords: async (
      { createHistoryRecord },
      provide
    ) => {
      await provide((count, details) =>
        Promise.all(
          Array.from({ length: count }, (_, index) =>
            createHistoryRecord({
              ...details,
              label: `${details.label ?? E2E_RESERVATION_HISTORY.BATCH_LABEL}-${index}`,
            })
          )
        )
      );
    },
  });

export { expect } from "@playwright/test";
