import { createElement, type ReactElement } from "react";
import Link from "@/app/components/link/Link";
import {
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { ReservationCalendarBlock } from "../models/ReservationCalendarBlock.interface";
import type { ReservationCalendarDayContentOptions } from "../models/ReservationCalendarDayContentOptions.interface";
import { ReservationCalendarBlock as ReservationCalendarBlockComponent } from "../components/ReservationCalendarBlock";
import { RESERVATION_CALENDAR_BLOCK_LINK_CLASS } from "../styles/ReservationCalendar.styles";

export const buildReservationCalendarBlockElements = (
  blocks: ReservationCalendarBlock[],
  options: ReservationCalendarDayContentOptions,
  showEquipmentImage: boolean
): ReactElement[] =>
  blocks.map((block) => {
    const reservationBlock = createElement(
      ReservationCalendarBlockComponent,
      {
        block,
        reserveMobileFabSpace:
          options.reserveMobileFabSpace === true,
        showEquipmentImage,
        showGuides: options.showGuides === true,
        key: block.id,
      }
    );
    if (options.enableDetailLinks !== true) {
      return reservationBlock;
    }
    return createElement(Link, {
      ariaLabel: `${RESERVATIONS_CALENDAR_COPY.OPEN_RESERVATION_DETAIL} ${block.customerName}`,
      className: RESERVATION_CALENDAR_BLOCK_LINK_CLASS,
      href: PATHS.RESERVATIONS.DETAIL(block.id),
      children: reservationBlock,
      key: block.id,
    });
  });
