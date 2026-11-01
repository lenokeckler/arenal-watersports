import {
  PATHS,
  RESERVATION_HISTORY_FILTER_PARAM as PARAM,
  RESERVATION_TYPE,
} from "@/app/constants";
import { E2E_RESERVATION_HISTORY_COPY as COPY } from "../constants/E2eReservationHistory.constants";
import { E2E_RESERVATION_HISTORY_DETAIL_ID as DETAIL_ID } from "../constants/E2eReservationHistoryDetail.constants";
import { createReservationHistoryDetailPage } from "../pages/ReservationHistoryDetail.page";
import { createReservationHistoryPage } from "../pages/ReservationHistory.page";
import { createSessionBarPage } from "../pages/SessionBar.page";
import { buildReservationHistoryDay } from "../support/buildReservationHistoryDay";
import {
  expect,
  test,
} from "../support/reservationHistoryTest";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation history detail states", () => {
  test("returns from the detail to the same filters", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const day = buildReservationHistoryDay(testInfo);
    const record = await createHistoryRecord({
      startsAt: day.startsAt,
      type: RESERVATION_TYPE.TOUR,
    });
    await signInAsSeededWorker(page);
    const historyPage = createReservationHistoryPage(page);
    const detailPage =
      createReservationHistoryDetailPage(page);
    const filters = {
      ...day.query,
      [PARAM.TYPE]: RESERVATION_TYPE.TOUR,
    };
    await historyPage.goTo(filters);
    await historyPage
      .getRecord(record.customerName)
      .click();

    await expect(
      detailPage.getField(COPY.CUSTOMER_LABEL)
    ).toContainText(record.customerName);
    await detailPage.getBackLink().click();

    await expect(page).toHaveURL(
      (url) =>
        url.pathname === PATHS.HISTORY.ROOT &&
        Object.entries(filters).every(
          ([name, value]) =>
            url.searchParams.get(name) === value
        )
    );
    await expect(
      historyPage.getRecord(record.customerName)
    ).toBeVisible();
  });

  test("shows the not found state with a way back for unknown and malformed ids", async ({
    page,
  }) => {
    await signInAsSeededWorker(page);
    const detailPage =
      createReservationHistoryDetailPage(page);

    for (const id of Object.values(DETAIL_ID)) {
      await detailPage.goToRecord(id);

      await expect(
        detailPage.getNotFoundTitle()
      ).toBeVisible();
      await expect(detailPage.getBackLink()).toBeVisible();
    }
  });

  test("keeps the session bar on the detail route", async ({
    createHistoryRecord,
    page,
  }, testInfo) => {
    const record = await createHistoryRecord({
      startsAt:
        buildReservationHistoryDay(testInfo).startsAt,
    });
    await signInAsSeededWorker(page);
    const detailPage =
      createReservationHistoryDetailPage(page);
    await detailPage.goToRecord(record.id);

    await expect(detailPage.getBackLink()).toBeVisible();
    await expect(
      createSessionBarPage(page).getBar()
    ).toBeVisible();
  });
});
