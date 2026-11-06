import type { ReactElement } from "react";
import { Section, Title } from "@/app/components";
import {
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
  TitleVariant,
} from "@/app/constants";
import Link from "@/app/components/link/Link";
import { RESERVATION_CALENDAR_BLOCK_LINK_CLASS } from "@/app/components/reservation-calendar/styles/ReservationCalendar.styles";
import type { ReservationCalendarGroupListProps } from "../models/ReservationCalendarGroupListProps.interface";
import { ReservationCalendarBlock } from "@/app/components/reservation-calendar/components/ReservationCalendarBlock";
import {
  RESERVATION_CALENDAR_GROUPS_CLASS,
  RESERVATION_CALENDAR_GROUP_CLASS,
  RESERVATION_CALENDAR_GROUP_BLOCKS_CLASS,
} from "../styles/ReservationCalendarGroups.styles";

export const ReservationCalendarGroupList = ({
  groups,
}: ReservationCalendarGroupListProps): ReactElement => (
  <div className={RESERVATION_CALENDAR_GROUPS_CLASS}>
    {groups.map((group) => (
      <Section
        key={group.dateLabel}
        aria-label={group.dateLabel}
        className={RESERVATION_CALENDAR_GROUP_CLASS}
      >
        <Title
          variant={TitleVariant.AUXILIAR}
          text={group.dateLabel}
        />
        <div
          className={
            RESERVATION_CALENDAR_GROUP_BLOCKS_CLASS
          }
        >
          {group.blocks.map((block) => (
            <Link
              key={block.id}
              href={PATHS.RESERVATIONS.DETAIL(block.id)}
              ariaLabel={`${RESERVATIONS_CALENDAR_COPY.OPEN_RESERVATION_DETAIL} ${block.customerName}`}
              className={
                RESERVATION_CALENDAR_BLOCK_LINK_CLASS
              }
            >
              <ReservationCalendarBlock block={block} />
            </Link>
          ))}
        </div>
      </Section>
    ))}
  </div>
);
