import type {
  Locator,
  Page,
  Response,
} from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_EDIT_COPY as copy } from "@/app/features/reservations/reservation-form/constants/ReservationEditCopy.constants";
import type { NullableRef } from "@/app/types";
import { resolveReservationEditPath } from "@/app/utils/reservations/resolveReservationEditPath";
import { E2E_RESERVATION_FORM_COPY as formCopy } from "../constants/E2eReservationForm.constants";
import { getMainRegion } from "../support/mainRegion";
import { createReservationFormScheduleFieldsPage } from "./ReservationFormScheduleFields.page";

export const createReservationEditPage = (page: Page) => {
  const main = getMainRegion(page);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, { name: copy.SUBMIT });

  return {
    ...createReservationFormScheduleFieldsPage(page),
    getEquipmentFields: (): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: formCopy.CATEGORY,
        exact: true,
      }),
    getPeopleInput: (): Locator =>
      main.getByLabel(formCopy.PEOPLE_COUNT, {
        exact: false,
      }),
    getSubmit,
    getText: (text: string): Locator =>
      main.getByText(text),
    goTo: (id: string): Promise<NullableRef<Response>> =>
      page.goto(resolveReservationEditPath(id)),
    save: async (): Promise<void> => {
      await getSubmit().click();
    },
  };
};
