import {
  InlineText,
  Section,
  Title,
} from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_FIELD_ID } from "../constants/ReservationExtraTimeUi.constants";
import { RESERVATION_EXTRA_TIME_UI_COPY as COPY } from "../constants/ReservationExtraTimeUiCopy.constants";
import type { ReservationExtraTimeViewProps } from "../models/ReservationExtraTimeViewProps.interface";
import {
  RESERVATION_EXTRA_TIME_GROUP_LIST_CLASS,
  RESERVATION_EXTRA_TIME_GROUPS_CLASS,
  RESERVATION_EXTRA_TIME_GROUPS_HEADING_CLASS,
  RESERVATION_EXTRA_TIME_TOTAL_CLASS,
  RESERVATION_EXTRA_TIME_TOTAL_LABEL_CLASS,
  RESERVATION_EXTRA_TIME_TOTAL_VALUE_CLASS,
} from "../styles/ReservationExtraTime.styles";
import { formatReservationExtraTimeMinutes } from "../utils/formatReservationExtraTimeMinutes";
import ReservationExtraTimeGroupItem from "./ReservationExtraTimeGroupItem";

const ReservationExtraTimeGroups = ({
  extraTime,
}: ReservationExtraTimeViewProps): React.JSX.Element => (
  <Section
    ariaLabel={
      RESERVATION_EXTRA_TIME_FIELD_ID.GROUPS_HEADING
    }
    className={RESERVATION_EXTRA_TIME_GROUPS_CLASS}
  >
    <Title
      id={RESERVATION_EXTRA_TIME_FIELD_ID.GROUPS_HEADING}
      variant={TitleVariant.SECONDARY}
      text={COPY.GROUPS_TITLE}
      className={
        RESERVATION_EXTRA_TIME_GROUPS_HEADING_CLASS
      }
    />
    <ul className={RESERVATION_EXTRA_TIME_GROUP_LIST_CLASS}>
      {extraTime.groups.map((group) => (
        <ReservationExtraTimeGroupItem
          key={`${group.categoryId}-${group.dispatchedAt}`}
          group={group}
        />
      ))}
    </ul>
    <div className={RESERVATION_EXTRA_TIME_TOTAL_CLASS}>
      <InlineText
        className={RESERVATION_EXTRA_TIME_TOTAL_LABEL_CLASS}
      >
        {COPY.TOTAL}
      </InlineText>
      <InlineText
        className={RESERVATION_EXTRA_TIME_TOTAL_VALUE_CLASS}
      >
        {formatReservationExtraTimeMinutes(
          extraTime.totalMinutes
        )}
      </InlineText>
    </div>
  </Section>
);

export default ReservationExtraTimeGroups;
