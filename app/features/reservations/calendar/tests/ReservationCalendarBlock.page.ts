import { screen, within } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationCalendarBlock } from "@/app/components/reservation-calendar/models/ReservationCalendarBlock.interface";
import type { ReservationCalendarBlockPage } from "./models/ReservationCalendarBlockPage.interface";
import { RESERVATION_BLOCK_TEST } from "./ReservationCalendarBlock.constants";

export const createReservationCalendarBlockPage = (
  block: ReservationCalendarBlock
): ReservationCalendarBlockPage => {
  const getBlock = (): HTMLElement =>
    screen.getByRole(ARIA_ROLE.GROUP, {
      name: block.accessibleLabel,
    });
  const getText = (text: string): HTMLElement =>
    within(getBlock()).getByText(text);
  const getTexts = (text: string): HTMLElement[] =>
    within(getBlock()).getAllByText(text);
  const getFocusableElements = (): Element[] => {
    const element = getBlock();
    return [
      element,
      ...element.querySelectorAll(
        RESERVATION_BLOCK_TEST.FOCUSABLE_SELECTOR
      ),
    ].filter((candidate): boolean =>
      candidate.matches(
        RESERVATION_BLOCK_TEST.FOCUSABLE_SELECTOR
      )
    );
  };
  return {
    getBlock,
    getModifyLink: (): NullableRef<HTMLElement> =>
      within(getBlock()).queryByRole(ARIA_ROLE.LINK),
    getFocusableElements,
    getEquipmentImages: (): HTMLImageElement[] =>
      Array.from(getBlock().querySelectorAll("img")),
    getText,
    getTexts,
  };
};
