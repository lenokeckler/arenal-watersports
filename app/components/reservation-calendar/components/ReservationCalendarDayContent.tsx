import { Fragment, type ReactElement } from "react";
import Link from "@/app/components/link/Link";
import { Text } from "@/app/components";
import {
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { RESERVATION_CALENDAR_BLOCK_LINK_CLASS } from "../styles/ReservationCalendar.styles";
import type { ReservationCalendarDayContentProps } from "../models/ReservationCalendarDayContentProps.interface";
import { ReservationCalendarBlock } from "./ReservationCalendarBlock";

export const ReservationCalendarDayContent = ({
  blocks,
  enableDetailLinks = false,
  messages,
  reserveMobileFabSpace = false,
  showEquipmentImage,
  showGuides = false,
}: ReservationCalendarDayContentProps): ReactElement => (
  <Fragment>
    {messages.map((message) => (
      <Text key={message}>{message}</Text>
    ))}
    {blocks.map((block) => {
      const reservationBlock = (
        <ReservationCalendarBlock
          key={block.id}
          block={block}
          reserveMobileFabSpace={reserveMobileFabSpace}
          showEquipmentImage={showEquipmentImage}
          showGuides={showGuides}
        />
      );
      if (!enableDetailLinks) {
        return reservationBlock;
      }
      return (
        <Link
          key={block.id}
          href={PATHS.RESERVATIONS.DETAIL(block.id)}
          ariaLabel={`${RESERVATIONS_CALENDAR_COPY.OPEN_RESERVATION_DETAIL} ${block.customerName}`}
          className={RESERVATION_CALENDAR_BLOCK_LINK_CLASS}
        >
          {reservationBlock}
        </Link>
      );
    })}
  </Fragment>
);
