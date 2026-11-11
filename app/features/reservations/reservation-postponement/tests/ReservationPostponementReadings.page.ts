import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_READINGS_COPY as COPY } from "../constants/ReservationPostponementReadingsCopy.constants";
import type { ReservationPostponementUsageMetric } from "../models/ReservationPostponementUsageMetric.type";

export const createReservationPostponementReadingsPage =
  () => {
    const user = userEvent.setup();

    const getUnit = (unitCode: string) =>
      screen.getByRole(ARIA_ROLE.REGION, {
        name: unitCode,
      });

    const getFuelOptions = (unitCode: string) =>
      within(getUnit(unitCode)).queryAllByRole(
        ARIA_ROLE.RADIO
      );

    const chooseFuel = (
      unitCode: string,
      level: number,
      max: number
    ) =>
      user.click(
        within(getUnit(unitCode)).getByRole(
          ARIA_ROLE.RADIO,
          { name: COPY.FUEL_LEVEL_LABEL(level, max) }
        )
      );

    const getUsageInput = (
      unitCode: string,
      metric: ReservationPostponementUsageMetric
    ) =>
      within(getUnit(unitCode)).getByLabelText(
        COPY.USAGE_FIELD_LABEL(metric),
        { exact: false }
      );

    const typeUsage = (
      unitCode: string,
      metric: ReservationPostponementUsageMetric,
      value: string
    ) => user.type(getUsageInput(unitCode, metric), value);

    const queryLegend = () =>
      screen.queryByText(COPY.LEGEND);

    const queryUnitText = (
      unitCode: string,
      text: string
    ) => within(getUnit(unitCode)).queryByText(text);

    return {
      chooseFuel,
      getFuelOptions,
      getUsageInput,
      queryLegend,
      queryUnitText,
      typeUsage,
    };
  };
