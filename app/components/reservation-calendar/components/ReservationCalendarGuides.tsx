import type { JSX } from "react";
import { InlineText, Text } from "@/app/components";
import { RESERVATION_CALENDAR_GUIDE_TYPE } from "@/app/constants";
import { RESERVATION_CALENDAR_GUIDE_COPY as guideCopy } from "../constants/ReservationCalendarGuideCopy.constants";
import type { ReservationCalendarGuidesProps } from "../models/ReservationCalendarGuidesProps.interface";
import {
  RESERVATION_CALENDAR_BLOCK_GUIDES_CLASS,
  RESERVATION_CALENDAR_BLOCK_GUIDE_NAME_CLASS,
  RESERVATION_CALENDAR_BLOCK_GUIDE_ROW_CLASS,
  RESERVATION_CALENDAR_BLOCK_GUIDE_TYPE_CLASS,
} from "../styles/ReservationCalendar.styles";

export const ReservationCalendarGuides = ({
  guides,
}: ReservationCalendarGuidesProps): JSX.Element => (
  <div className={RESERVATION_CALENDAR_BLOCK_GUIDES_CLASS}>
    <Text>{guideCopy.LABEL}</Text>
    {guides.length === 0 ? (
      <Text>{guideCopy.UNASSIGNED}</Text>
    ) : (
      guides.map((guide) => {
        const unavailable =
          guide.type ===
          RESERVATION_CALENDAR_GUIDE_TYPE.UNAVAILABLE;
        const guideType =
          guide.type ===
          RESERVATION_CALENDAR_GUIDE_TYPE.INTERNAL
            ? guideCopy.ACCOUNT
            : guideCopy.EXTERNAL;
        return (
          <Text
            className={
              RESERVATION_CALENDAR_BLOCK_GUIDE_ROW_CLASS
            }
            key={guide.id}
          >
            <InlineText
              className={
                RESERVATION_CALENDAR_BLOCK_GUIDE_NAME_CLASS
              }
            >
              {unavailable
                ? guideCopy.UNAVAILABLE
                : guide.fullName}
            </InlineText>
            {unavailable ? null : (
              <InlineText
                className={
                  RESERVATION_CALENDAR_BLOCK_GUIDE_TYPE_CLASS
                }
              >
                {guideType}
              </InlineText>
            )}
          </Text>
        );
      })
    )}
  </div>
);
