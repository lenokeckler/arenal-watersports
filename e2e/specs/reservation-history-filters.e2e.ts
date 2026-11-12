import {
  RESERVATION_HISTORY_FILTER_PARAM as PARAM,
  RESERVATION_TYPE,
} from "@/app/constants";
import {
  E2E_RESERVATION_HISTORY_COPY as COPY,
  E2E_RESERVATION_HISTORY_DAY_OFFSET as OFFSET,
  E2E_RESERVATION_HISTORY_LOOKUP as LOOKUP,
} from "../constants/E2eReservationHistory.constants";
import { createReservationHistoryPage } from "../pages/ReservationHistory.page";
import { buildReservationHistoryDay } from "../support/buildReservationHistoryDay";
import { expectReservationHistoryRecords } from "../support/expectReservationHistoryRecords";
import { test } from "../support/reservationHistoryTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation history filters", () => {
  test("filters by date range on both bounds", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const [first, second, third, after] = [
      OFFSET.FIRST,
      OFFSET.SECOND,
      OFFSET.THIRD,
      OFFSET.AFTER_RANGE,
    ].map((offset) =>
      buildReservationHistoryDay(testInfo, offset)
    );
    const [early, inside, late] = await Promise.all(
      [first, second, after].map(({ startsAt }, index) =>
        createHistoryRecord({
          label: `${index}`,
          startsAt,
        })
      )
    );
    await signInAsSeededWorker(page);
    const historyPage = createReservationHistoryPage(page);
    await historyPage.goTo({
      ...first.query,
      [PARAM.TO]: third.date,
    });
    await historyPage.applyFilters({
      category: COPY.FILTER_ALL,
      from: second.date,
      type: COPY.FILTER_ALL,
    });

    await expectReservationHistoryRecords(
      historyPage,
      [inside.customerName],
      [early.customerName, late.customerName]
    );
  });

  test("filters by reservation type", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const rental = await createHistoryRecord({
      label: RESERVATION_TYPE.RENTAL,
      startsAt: day.startsAt,
    });
    const tour = await createHistoryRecord({
      label: RESERVATION_TYPE.TOUR,
      startsAt: day.startsAt,
      type: RESERVATION_TYPE.TOUR,
    });
    await signInAsSeededWorker(page);
    const historyPage = createReservationHistoryPage(page);
    await historyPage.goTo(day.query);
    await historyPage.applyFilters({
      category: COPY.FILTER_ALL,
      from: day.date,
      type: COPY.TYPE_TOUR,
    });

    await expectReservationHistoryRecords(
      historyPage,
      [tour.customerName],
      [rental.customerName]
    );
  });

  test("filters by equipment category", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const jetSki = await createHistoryRecord({
      label: LOOKUP.DEFAULT_CATEGORY_NAME,
      startsAt: day.startsAt,
    });
    const kayak = await createHistoryRecord({
      label: LOOKUP.ALTERNATE_CATEGORY_NAME,
      startsAt: day.startsAt,
      unitCode: LOOKUP.ALTERNATE_UNIT_CODE,
    });
    await signInAsSeededWorker(page);
    const historyPage = createReservationHistoryPage(page);
    await historyPage.goTo(day.query);
    await historyPage.applyFilters({
      category: LOOKUP.DEFAULT_CATEGORY_NAME,
      from: day.date,
      type: COPY.FILTER_ALL,
    });

    await expectReservationHistoryRecords(
      historyPage,
      [jetSki.customerName],
      [kayak.customerName]
    );
  });
});
