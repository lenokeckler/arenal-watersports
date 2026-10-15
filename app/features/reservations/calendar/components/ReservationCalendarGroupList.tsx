import type { ReactElement } from "react";
import { Section, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import type { ReservationCalendarGroupListProps } from "../models/ReservationCalendarGroupListProps.interface";
import { ReservationCalendarBlock } from "./ReservationCalendarBlock";
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
            <ReservationCalendarBlock
              key={block.id}
              block={block}
            />
          ))}
        </div>
      </Section>
    ))}
  </div>
);
