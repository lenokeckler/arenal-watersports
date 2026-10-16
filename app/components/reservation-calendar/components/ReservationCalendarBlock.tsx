import type { JSX } from "react";
import {
  InlineText,
  Section,
  Text,
  UnorderedList,
} from "@/app/components";
import {
  ARIA_ROLE,
  RESERVATIONS_CALENDAR_COPY,
  RESERVATION_CALENDAR_GUIDE_TYPE,
  STRING,
} from "@/app/constants";
import { RESERVATION_CALENDAR_GUIDE_COPY as guideCopy } from "../constants/ReservationCalendarGuideCopy.constants";
import type { ReservationCalendarBlockProps } from "../models/ReservationCalendarBlockProps.interface";
import type { ReservationCalendarGuide } from "../models/ReservationCalendarGuide.type";
import {
  RESERVATION_CALENDAR_BLOCK_CLASS,
  RESERVATION_CALENDAR_BLOCK_EQUIPMENT_CLASS,
  RESERVATION_CALENDAR_BLOCK_GUIDES_CLASS,
  RESERVATION_CALENDAR_BLOCK_GUIDE_NAME_CLASS,
  RESERVATION_CALENDAR_BLOCK_GUIDE_ROW_CLASS,
  RESERVATION_CALENDAR_BLOCK_GUIDE_TYPE_CLASS,
  RESERVATION_CALENDAR_BLOCK_GROUPS_CLASS,
  RESERVATION_CALENDAR_BLOCK_NAME_CLASS,
  RESERVATION_CALENDAR_BLOCK_TIME_CLASS,
} from "../styles/ReservationCalendar.styles";

const getGuideTypeLabel = (
  type: ReservationCalendarGuide["type"]
): string =>
  type === RESERVATION_CALENDAR_GUIDE_TYPE.INTERNAL
    ? guideCopy.ACCOUNT
    : guideCopy.EXTERNAL;

export const ReservationCalendarBlock = ({
  block,
  showGuides = false,
}: ReservationCalendarBlockProps): JSX.Element => (
  <Section
    role={ARIA_ROLE.GROUP}
    aria-label={
      showGuides && block.guides.length > 0
        ? [
            block.accessibleLabel,
            guideCopy.LABEL,
            ...block.guides.map((guide) =>
              [
                guide.fullName,
                getGuideTypeLabel(guide.type),
              ].join(STRING.SPACE)
            ),
          ].join(
            RESERVATIONS_CALENDAR_COPY.DETAIL_SEPARATOR
          )
        : block.accessibleLabel
    }
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
    {showGuides && block.guides.length > 0 ? (
      <div
        className={RESERVATION_CALENDAR_BLOCK_GUIDES_CLASS}
      >
        <Text>{guideCopy.LABEL}</Text>
        {block.guides.map((guide, index) => (
          <Text
            className={
              RESERVATION_CALENDAR_BLOCK_GUIDE_ROW_CLASS
            }
            key={`${guide.type}-${guide.fullName}-${index}`}
          >
            <InlineText
              className={
                RESERVATION_CALENDAR_BLOCK_GUIDE_NAME_CLASS
              }
            >
              {guide.fullName}
            </InlineText>
            <InlineText
              className={
                RESERVATION_CALENDAR_BLOCK_GUIDE_TYPE_CLASS
              }
            >
              {getGuideTypeLabel(guide.type)}
            </InlineText>
          </Text>
        ))}
      </div>
    ) : null}
    <UnorderedList
      items={block.actualLabels}
      className={RESERVATION_CALENDAR_BLOCK_GROUPS_CLASS}
    />
  </Section>
);
