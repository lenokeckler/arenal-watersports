import { screen } from "@testing-library/react";
import {
  ARIA_ROLE,
  RESERVATIONS_CALENDAR_COPY,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const createReservationsCalendarBlocksPage = () => {
  const getReservationBlocks = () =>
    screen.queryAllByRole(ARIA_ROLE.GROUP, {
      name: new RegExp(
        RESERVATIONS_CALENDAR_COPY.RESERVATION_NAME
      ),
    });
  const getReservationBlockContainerClasses = (
    containerClass: string
  ): NullableRef<string>[] =>
    getReservationBlocks().map((block) => {
      let ancestor = block.parentElement;
      while (ancestor !== null) {
        if (ancestor.className === containerClass) {
          return ancestor.className;
        }
        ancestor = ancestor.parentElement;
      }
      return null;
    });
  const getReservationBlockDetailsClassName = (
    customerName: string
  ): string =>
    screen.getByText(customerName).parentElement
      ?.className ?? STRING.Empty;
  const hasEquipmentImage = (
    customerName: string
  ): boolean =>
    Boolean(
      getReservationBlocks()
        .find((block) =>
          block.textContent?.includes(customerName)
        )
        ?.querySelector("img")
    );
  return {
    getReservationBlockContainerClasses,
    getReservationBlockDetailsClassName,
    getReservationBlocks,
    hasEquipmentImage,
  };
};
