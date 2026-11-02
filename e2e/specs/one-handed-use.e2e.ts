import { expect, test } from "@playwright/test";
import { DOCUMENT_LANGUAGE } from "@/app/constants";
import { RESERVATION_DURATION_PRESETS } from "@/app/features/reservations/reservation-form/constants/ReservationFormUi.constants";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { E2E_RESERVATION_FORM_MOBILE_VIEWPORT } from "../constants/E2eReservationForm.constants";
import { E2E_PROJECT } from "../constants/E2eRuntime.constants";
import { createOneHandedUsePage } from "../pages/OneHandedUse.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.beforeEach(async ({ page }, testInfo) => {
  await signInAsSeededWorker(page);

  if (testInfo.project.name === E2E_PROJECT.MOBILE) {
    await page.setViewportSize({
      width: E2E_RESERVATION_FORM_MOBILE_VIEWPORT.WIDTH,
      height: E2E_RESERVATION_FORM_MOBILE_VIEWPORT.HEIGHT,
    });
  }
});

test("shows Spanish reservation copy and accessible fields", async ({
  page,
}) => {
  const oneHandedUsePage = createOneHandedUsePage(page);

  await oneHandedUsePage.goTo();

  await expect(
    oneHandedUsePage.getDocumentRoot()
  ).toHaveAttribute("lang", DOCUMENT_LANGUAGE);
  await expect(oneHandedUsePage.getHeading()).toHaveText(
    RESERVATION_FORM_UI_COPY.TITLE
  );
  await expect(
    oneHandedUsePage.getDescription()
  ).toHaveText(RESERVATION_FORM_UI_COPY.DESCRIPTION);
  await expect(
    oneHandedUsePage.getCustomerNameInput()
  ).toHaveAccessibleName(
    new RegExp(RESERVATION_FORM_UI_COPY.CUSTOMER_NAME)
  );
  await expect(
    oneHandedUsePage.getPeopleCountInput()
  ).toHaveAccessibleName(
    new RegExp(RESERVATION_FORM_UI_COPY.PEOPLE_COUNT)
  );
  await expect(
    oneHandedUsePage.getDateInput()
  ).toHaveAccessibleName(
    new RegExp(RESERVATION_FORM_UI_COPY.DATE)
  );
  await expect(
    oneHandedUsePage.getTimeInput()
  ).toHaveAccessibleName(
    new RegExp(RESERVATION_FORM_UI_COPY.TIME)
  );
  await expect(
    oneHandedUsePage.getTimeZoneHint()
  ).toHaveText(RESERVATION_FORM_UI_COPY.TIME_ZONE);
});

test("shows accessible equipment fields", async ({
  page,
}) => {
  const oneHandedUsePage = createOneHandedUsePage(page);

  await oneHandedUsePage.goTo();

  await expect(
    oneHandedUsePage.getCategorySelect()
  ).toHaveAccessibleName(
    new RegExp(RESERVATION_FORM_UI_COPY.CATEGORY)
  );
  await expect(
    oneHandedUsePage.getCategoryPlaceholder()
  ).toHaveText(
    RESERVATION_FORM_UI_COPY.CATEGORY_PLACEHOLDER
  );
  await expect(
    oneHandedUsePage.getQuantityInput()
  ).toHaveAccessibleName(
    new RegExp(RESERVATION_FORM_UI_COPY.QUANTITY)
  );
});

test("shows duration choices and reservation actions", async ({
  page,
}) => {
  const oneHandedUsePage = createOneHandedUsePage(page);

  await oneHandedUsePage.goTo();

  await expect(
    oneHandedUsePage.getDurationHeading()
  ).toHaveText(RESERVATION_FORM_UI_COPY.DURATION);
  for (const preset of RESERVATION_DURATION_PRESETS) {
    await expect(
      oneHandedUsePage.getDurationButton(preset.label)
    ).toHaveText(preset.label);
  }
  await expect(
    oneHandedUsePage.getDurationButton(
      RESERVATION_FORM_UI_COPY.CUSTOM_DURATION_OPTION
    )
  ).toHaveText(
    RESERVATION_FORM_UI_COPY.CUSTOM_DURATION_OPTION
  );
  await expect(oneHandedUsePage.getBackButton()).toHaveText(
    RESERVATION_FORM_UI_COPY.BACK_TO_CALENDAR
  );
  await expect(
    oneHandedUsePage.getSubmitButton()
  ).toHaveText(RESERVATION_FORM_UI_COPY.SUBMIT);
});
