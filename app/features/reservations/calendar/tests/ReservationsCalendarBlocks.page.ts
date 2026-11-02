import { screen } from "@testing-library/react";
import {
  ARIA_ROLE,
  RESERVATIONS_CALENDAR_COPY,
  STRING,
} from "@/app/constants";

export const createReservationsCalendarBlocksPage = () => {
  const getReservationBlocks = () =>
    screen.queryAllByRole(ARIA_ROLE.GROUP, {
      name: new RegExp(
        RESERVATIONS_CALENDAR_COPY.RESERVATION_NAME
      ),
    });
  const getReservationBlockContainerClasses = () =>
    getReservationBlocks().map(
      (block) => block.parentElement?.className
    );
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
