import type { JSX } from "react";
import {
  Section,
  Text,
  UnorderedList,
} from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import type { ReservationCalendarBlockProps } from "../models/ReservationCalendarBlockProps.interface";
import { buildReservationCalendarBlockAccessibleLabel } from "../utils/buildReservationCalendarBlockAccessibleLabel";
import { ReservationCalendarGuides } from "./ReservationCalendarGuides";
import { ReservationEquipmentImage } from "./ReservationEquipmentImage";
import {
  RESERVATION_CALENDAR_BLOCK_CLASS,
  RESERVATION_CALENDAR_BLOCK_CONTENT_CLASS,
  RESERVATION_CALENDAR_BLOCK_EQUIPMENT_CLASS,
  RESERVATION_CALENDAR_BLOCK_GROUPS_CLASS,
  RESERVATION_CALENDAR_BLOCK_NAME_CLASS,
  RESERVATION_CALENDAR_BLOCK_TIME_CLASS,
  resolveReservationCalendarBlockDetailsClass,
} from "../styles/ReservationCalendar.styles";

export const ReservationCalendarBlock = ({
  block,
  reserveMobileFabSpace = false,
  showGuides = false,
}: ReservationCalendarBlockProps): JSX.Element => (
  <Section
    role={ARIA_ROLE.GROUP}
    aria-label={buildReservationCalendarBlockAccessibleLabel(
      block,
      showGuides
    )}
    className={RESERVATION_CALENDAR_BLOCK_CLASS}
  >
    <div
      className={RESERVATION_CALENDAR_BLOCK_CONTENT_CLASS}
    >
      <ReservationEquipmentImage
        categoryName={block.equipmentLabel}
      />
      <div
        className={resolveReservationCalendarBlockDetailsClass(
          reserveMobileFabSpace
        )}
      >
        <Text
          className={RESERVATION_CALENDAR_BLOCK_TIME_CLASS}
        >
          {block.scheduledLabel}
        </Text>
        <Text
          className={RESERVATION_CALENDAR_BLOCK_NAME_CLASS}
        >
          {block.customerName}
        </Text>
        <Text
          className={
            RESERVATION_CALENDAR_BLOCK_EQUIPMENT_CLASS
          }
        >
          {block.equipmentLabel}
        </Text>
      </div>
    </div>
    {showGuides && block.guides !== undefined ? (
      <ReservationCalendarGuides guides={block.guides} />
    ) : null}
    <UnorderedList
      items={block.actualLabels}
      className={RESERVATION_CALENDAR_BLOCK_GROUPS_CLASS}
    />
  </Section>
);
