import { RESERVATION_EDIT_COPY as copy } from "@/app/features/reservations/reservation-form/constants/ReservationEditCopy.constants";
import {
  E2E_RESERVATION_EDIT as values,
  E2E_RESERVATION_EDIT_SCREENSHOT_STATE as state,
  E2E_RESERVATION_EDIT_SEED as seed,
} from "../constants/E2eReservationEdit.constants";
import { createReservationEditPage } from "../pages/ReservationEdit.page";
import { createReservationsCalendarPage } from "../pages/ReservationsCalendar.page";
import { expect, test } from "../support/activeWorkerTest";
import { captureFullPage } from "../support/captureFullPage";
import { createReservationEditFixture as seedEdit } from "../support/createReservationEditFixture";
import { removeReservationsForWorker } from "../support/removeReservationsForWorker";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test("captures every reservation edit state", async ({
  activeWorker,
  page,
}, testInfo) => {
  await signInToReservationsMode(page, activeWorker);
  const { customerName } = await seedEdit(activeWorker.id);
  const combo = await seedEdit(activeWorker.id, seed.COMBO);
  const dispatched = await seedEdit(
    activeWorker.id,
    seed.DISPATCHED
  );
  const stale = await seedEdit(activeWorker.id);
  const calendar = createReservationsCalendarPage(page);
  const edit = createReservationEditPage(page);
  const captureState = (name: string): Promise<void> =>
    captureFullPage(
      page,
      `${values.SCREENSHOT_BASENAME}-${name}`,
      testInfo.project.name
    );

  try {
    await calendar.goTo();
    await expect(
      calendar.getModifyLink(customerName)
    ).toBeVisible();
    await captureState(state.CALENDAR_LINK);

    await calendar.getModifyLink(customerName).click();
    await expect(edit.getPeopleInput()).toBeVisible();
    await captureState(state.FORM);

    await edit.getPeopleInput().fill(values.PEOPLE);
    await edit.save();
    await expect(edit.getText(copy.SUCCESS)).toBeVisible();
    await captureState(state.SUCCESS);

    await edit.goTo(combo.id);
    await expect(
      edit.getText(copy.COMBO_LOCKED)
    ).toBeVisible();
    await captureState(state.LOCKED_COMBO);

    await edit.goTo(dispatched.id);
    await expect(
      edit.getText(copy.UNAVAILABLE_TITLE)
    ).toBeVisible();
    await captureState(state.NON_EDITABLE);

    await edit.goTo(stale.id);
    await edit.getTimeInput().fill(values.TIME);
    const otherTab = await page.context().newPage();
    const otherEdit = createReservationEditPage(otherTab);
    await otherEdit.goTo(stale.id);
    await otherEdit.getPeopleInput().fill(values.PEOPLE);
    await otherEdit.save();
    await expect(
      otherEdit.getText(copy.SUCCESS)
    ).toBeVisible();
    await otherTab.close();
    await edit.save();
    await expect(edit.getText(copy.STALE)).toBeVisible();
    await captureState(state.STALE);
  } finally {
    await removeReservationsForWorker(activeWorker);
  }
});
