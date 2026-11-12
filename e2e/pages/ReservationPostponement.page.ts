import type {
  Locator,
  Page,
  Response,
} from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FORM_COPY as copy } from "@/app/features/reservations/reservation-postponement/constants/ReservationPostponementFormCopy.constants";
import { RESERVATION_POSTPONEMENT_READINGS_COPY as readings } from "@/app/features/reservations/reservation-postponement/constants/ReservationPostponementReadingsCopy.constants";
import type { ReservationPostponementCause } from "@/app/features/reservations/reservation-postponement/models/ReservationPostponementCause.type";
import type { ReservationPostponementUsageMetric } from "@/app/features/reservations/reservation-postponement/models/ReservationPostponementUsageMetric.type";
import type { NullableRef } from "@/app/types";
import { resolveReservationPostponePath } from "@/app/utils/reservations/resolveReservationPostponePath";
import { getMainRegion } from "../support/mainRegion";

const PARENT_LABEL = "xpath=..";

export const createReservationPostponementPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, { name: copy.SUBMIT });
  const getCauseGroup = (): Locator =>
    main.getByRole(ARIA_ROLE.GROUP, {
      name: copy.LABEL_CAUSE,
    });
  const getUnit = (unitCode: string): Locator =>
    main.getByRole(ARIA_ROLE.REGION, { name: unitCode });

  return {
    chooseCause: (
      cause: ReservationPostponementCause
    ): Promise<void> =>
      getCauseGroup()
        .getByText(copy.CAUSE_LABEL[cause], { exact: true })
        .click(),
    chooseFuel: (
      unitCode: string,
      level: number,
      max: number
    ): Promise<void> =>
      getUnit(unitCode)
        .getByRole(ARIA_ROLE.RADIO, {
          name: readings.FUEL_LEVEL_LABEL(level, max),
        })
        .locator(PARENT_LABEL)
        .click(),
    fillDate: (date: string): Promise<void> =>
      main.getByLabel(copy.LABEL_NEW_DATE).fill(date),
    fillReason: (reason: string): Promise<void> =>
      main.getByLabel(copy.LABEL_REASON).fill(reason),
    fillUsage: (
      unitCode: string,
      metric: ReservationPostponementUsageMetric,
      value: string
    ): Promise<void> =>
      getUnit(unitCode)
        .getByLabel(readings.USAGE_FIELD_LABEL(metric))
        .fill(value),
    getAlert: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getCauseOptions: (): Locator =>
      getCauseGroup().getByRole(ARIA_ROLE.RADIO),
    getStatus: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS),
    getSubmit,
    getText: (text: string): Locator =>
      main.getByText(text),
    getUnit,
    goTo: (id: string): Promise<NullableRef<Response>> =>
      page.goto(resolveReservationPostponePath(id)),
    submit: (): Promise<void> => getSubmit().click(),
  };
};
