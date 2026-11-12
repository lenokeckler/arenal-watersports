import { createElement, type ReactElement } from "react";
import type { ReservationCalendarBlock } from "../models/ReservationCalendarBlock.interface";
import type { ReservationCalendarDayContentOptions } from "../models/ReservationCalendarDayContentOptions.interface";
import { ReservationCalendarBlockEntry } from "../components/ReservationCalendarBlockEntry";

export const buildReservationCalendarBlockElements = (
  blocks: ReservationCalendarBlock[],
  options: ReservationCalendarDayContentOptions,
  showEquipmentImage: boolean
): ReactElement[] =>
  blocks.map((block) =>
    createElement(ReservationCalendarBlockEntry, {
      actions: options.renderBlockActions?.(block),
      block,
      enableDetailLink: options.enableDetailLinks === true,
      reserveMobileFabSpace:
        options.reserveMobileFabSpace === true,
      showEquipmentImage,
      showGuides: options.showGuides === true,
      key: block.id,
    })
  );
