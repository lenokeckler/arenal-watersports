import { expect, test } from "@playwright/test";
import { createReservationCategoryConflictPage } from "../pages/ReservationCategoryConflict.page";
import { createReservationCategoryConflictFixture } from "../support/createReservationCategoryConflictFixture";
import { getReservationConflictDate } from "../support/getReservationConflictDate";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("warns about an overlapping category reservation and allows submission", async ({
  page,
}) => {
  await signInAsSeededWorker(page);
  const reservationPage =
    createReservationCategoryConflictPage(page);
  const projectName = test.info().project.name;
  const date = getReservationConflictDate(projectName);
  const fixture =
    createReservationCategoryConflictFixture();
  const customerNames =
    fixture.getCustomerNames(projectName);

  try {
    await fixture.prepare(projectName);
    await reservationPage.prepareOverlappingReservation(
      customerNames.first,
      date
    );
    await reservationPage.submit();
    await expect(
      reservationPage.getSuccessMessage()
    ).toBeVisible();

    await reservationPage.prepareOverlappingReservation(
      customerNames.second,
      date
    );
    await expect(
      reservationPage.getConflictWarning()
    ).toContainText(customerNames.first);
    await expect(
      reservationPage.getAvailabilityLoading()
    ).toBeHidden();
    await expect(
      reservationPage.getEquipmentEligibilityLoading()
    ).toBeHidden();
    await expect(
      reservationPage.getSubmitButton()
    ).toBeEnabled();

    await reservationPage.submit();

    await expect(
      reservationPage.getSuccessMessage()
    ).toBeVisible();
  } finally {
    await fixture.cleanup(projectName);
  }
});
