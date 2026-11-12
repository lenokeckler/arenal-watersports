import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import {
  SPLIT_DRAFT_TIME,
  SPLIT_ORIGINAL_TIME,
  SPLIT_UNIT_ITEM,
} from "./ReservationSplit.constants";

export const createReservationSplitUnitChoicePage = () => {
  const user = userEvent.setup();

  const getOriginalOption = () =>
    screen.getByRole(ARIA_ROLE.RADIO, {
      name: RESERVATION_SPLIT_UI_COPY.UNIT_OPTION_ORIGINAL(
        SPLIT_ORIGINAL_TIME
      ),
    });

  const getDepartureOption = (time = SPLIT_DRAFT_TIME) =>
    screen.getByRole(ARIA_ROLE.RADIO, {
      name: RESERVATION_SPLIT_UI_COPY.UNIT_OPTION_DEPARTURE(
        2,
        time
      ),
    });

  const getGroup = () =>
    screen.getByRole(ARIA_ROLE.GROUP, {
      name: SPLIT_UNIT_ITEM.label,
    });

  const selectNoTimeDeparture = () =>
    user.click(
      getDepartureOption(
        RESERVATION_SPLIT_UI_COPY.UNIT_OPTION_NO_TIME
      )
    );

  return {
    getDepartureOption,
    getGroup,
    getOriginalOption,
    selectNoTimeDeparture,
    selectDeparture: () => user.click(getDepartureOption()),
  };
};
