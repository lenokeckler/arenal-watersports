import type { JSX } from "react";
import {
  Section,
  Text,
  UnorderedList,
} from "@/app/components";
import { ARIA_ROLE, STRING } from "@/app/constants";
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

const ReservationBlockDetails = ({
  block,
  reserveMobileFabSpace = false,
}: ReservationCalendarBlockProps): JSX.Element => (
  <div
    className={resolveReservationCalendarBlockDetailsClass(
      reserveMobileFabSpace
    )}
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
  </div>
);

export const ReservationCalendarBlock = ({
  block,
  reserveMobileFabSpace = false,
  showEquipmentImage = true,
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
      {showEquipmentImage && (
        <ReservationEquipmentImage
          categoryName={
            block.equipmentCategoryName ?? STRING.Empty
          }
        />
      )}
      <ReservationBlockDetails
        block={block}
        reserveMobileFabSpace={reserveMobileFabSpace}
      />
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
