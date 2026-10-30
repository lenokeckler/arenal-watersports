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
import {
  RESERVATION_CALENDAR_BLOCK_CLASS,
  RESERVATION_CALENDAR_BLOCK_EQUIPMENT_CLASS,
  RESERVATION_CALENDAR_BLOCK_GROUPS_CLASS,
  RESERVATION_CALENDAR_BLOCK_NAME_CLASS,
  RESERVATION_CALENDAR_BLOCK_TIME_CLASS,
} from "../styles/ReservationCalendar.styles";

export const ReservationCalendarBlock = ({
  block,
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
    <Text className={RESERVATION_CALENDAR_BLOCK_TIME_CLASS}>
      {block.scheduledLabel}
    </Text>
    <Text className={RESERVATION_CALENDAR_BLOCK_NAME_CLASS}>
      {block.customerName}
    </Text>
    <Text
      className={RESERVATION_CALENDAR_BLOCK_EQUIPMENT_CLASS}
    >
      {block.equipmentLabel}
    </Text>
    {showGuides && block.guides !== undefined ? (
      <ReservationCalendarGuides guides={block.guides} />
    ) : null}
    <UnorderedList
      items={block.actualLabels}
      className={RESERVATION_CALENDAR_BLOCK_GROUPS_CLASS}
    />
  </Section>
);
