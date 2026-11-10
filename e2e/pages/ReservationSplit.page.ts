import type {
  Locator,
  Page,
  Response,
} from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_SPLIT_UI_COPY as copy } from "@/app/features/reservations/reservation-split/constants/ReservationSplitUiCopy.constants";
import type { NullableRef } from "@/app/types";
import { resolveReservationSplitPath } from "@/app/utils/reservations/resolveReservationSplitPath";
import { E2E_RESERVATION_SPLIT as values } from "../constants/E2eReservationSplit.constants";
import type { ReservationSplitFixture } from "../support/models/ReservationSplitFixture.interface";
import { getMainRegion } from "../support/mainRegion";

export const createReservationSplitPage = (page: Page) => {
  const main = getMainRegion(page);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, { name: copy.SUBMIT });
  const getStepButton = (ariaLabel: string): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: ariaLabel,
      exact: true,
    });

  const getUnitOption = (
    unitLabel: string,
    optionLabel: string
  ): Locator =>
    main
      .getByRole(ARIA_ROLE.GROUP, { name: unitLabel })
      .getByText(optionLabel);
  const stepUp = async (
    label: string,
    departureNumber: number,
    times: number
  ): Promise<void> => {
    const button = getStepButton(
      copy.STEPPER_ADD_ARIA(label, departureNumber)
    );
    for (let step = 0; step < times; step++) {
      await button.click();
    }
  };

  return {
    fillDeparture: async (
      fixture: ReservationSplitFixture
    ): Promise<void> => {
      await main
        .getByLabel(copy.LABEL_START_TIME)
        .first()
        .fill(fixture.departureTime);
      await stepUp(
        copy.PEOPLE,
        values.DEPARTURE_NUMBER,
        values.DEPARTURE_PEOPLE_STEPS
      );
      await stepUp(
        values.CATEGORY,
        values.DEPARTURE_NUMBER,
        values.DEPARTURE_QUANTITY_STEPS
      );
      await getUnitOption(
        fixture.unitLabel,
        copy.UNIT_OPTION_DEPARTURE(
          values.DEPARTURE_NUMBER,
          fixture.departureTime
        )
      ).click();
    },
    getAddDeparture: (): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: copy.ADD_DEPARTURE,
      }),
    getAlert: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getCreatedCodes: (): Locator =>
      main
        .getByRole(ARIA_ROLE.LIST)
        .getByRole(ARIA_ROLE.LISTITEM),
    getStepUp: (
      label: string,
      departureNumber: number
    ): Locator =>
      getStepButton(
        copy.STEPPER_ADD_ARIA(label, departureNumber)
      ),
    getSubmit,
    getText: (text: string): Locator =>
      main.getByText(text),
    goTo: (id: string): Promise<NullableRef<Response>> =>
      page.goto(resolveReservationSplitPath(id)),
    stepUp,
    submit: async (): Promise<void> => {
      await getSubmit().click();
    },
  };
};
