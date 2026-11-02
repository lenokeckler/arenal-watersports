import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DETAIL_COPY } from "../constants/ReservationDetailCopy.constants";
import type { ReservationDetailPage } from "./models/ReservationDetailPage.interface";

export const createReservationDetailPage =
  (): ReservationDetailPage => ({
    clickRetry: async (user): Promise<void> => {
      await user.click(
        screen.getByRole(ARIA_ROLE.BUTTON, {
          name: RESERVATION_DETAIL_COPY.RETRY,
        })
      );
    },
    getHeading: (name: string): HTMLElement =>
      screen.getByRole(ARIA_ROLE.HEADING, { name }),
    getText: (text: string): HTMLElement =>
      screen.getByText(text),
    getTexts: (text: string): HTMLElement[] =>
      screen.queryAllByText(text),
  });
