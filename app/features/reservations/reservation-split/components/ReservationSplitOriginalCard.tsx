import {
  InlineText,
  Section,
  Text,
} from "@/app/components";
import { RESERVATION_SPLIT_FIELD_ID } from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitCardProps } from "../models/ReservationSplitCardProps.interface";
import {
  RESERVATION_SPLIT_CARD_HEADING_CLASS,
  RESERVATION_SPLIT_CODE_CLASS,
  RESERVATION_SPLIT_DEFINITION_CLASS,
  RESERVATION_SPLIT_DETAILS_CLASS,
  RESERVATION_SPLIT_HINT_CLASS,
  RESERVATION_SPLIT_ORIGINAL_CLASS,
  RESERVATION_SPLIT_TERM_CLASS,
} from "../styles/ReservationSplitCards.styles";
import { buildReservationSplitSummaryRows } from "../utils/buildReservationSplitSummaryRows";
import ReservationSplitOriginalEquipment from "./ReservationSplitOriginalEquipment";

const HEADING_ID = `${RESERVATION_SPLIT_FIELD_ID.HEADING_PREFIX}original`;

const ReservationSplitOriginalCard = ({
  split,
  viewModel,
}: ReservationSplitCardProps): React.JSX.Element => (
  <Section
    ariaLabel={HEADING_ID}
    className={RESERVATION_SPLIT_ORIGINAL_CLASS}
  >
    <div>
      <h2
        id={HEADING_ID}
        className={RESERVATION_SPLIT_CARD_HEADING_CLASS}
      >
        {RESERVATION_SPLIT_UI_COPY.ORIGINAL_HEADING}
      </h2>
      <Text className={RESERVATION_SPLIT_CODE_CLASS}>
        {split.code}
      </Text>
    </div>
    <dl className={RESERVATION_SPLIT_DETAILS_CLASS}>
      {buildReservationSplitSummaryRows(
        split,
        viewModel.remainder
      ).map(({ hint, term, value }) => (
        <div key={term}>
          <dt className={RESERVATION_SPLIT_TERM_CLASS}>
            {term}
          </dt>
          <dd
            className={RESERVATION_SPLIT_DEFINITION_CLASS}
          >
            {value}
            {hint && (
              <InlineText
                className={RESERVATION_SPLIT_HINT_CLASS}
              >
                {` ${hint}`}
              </InlineText>
            )}
          </dd>
        </div>
      ))}
      <div>
        <dt className={RESERVATION_SPLIT_TERM_CLASS}>
          {RESERVATION_SPLIT_UI_COPY.LABEL_EQUIPMENT}
        </dt>
        <dd>
          <ReservationSplitOriginalEquipment
            split={split}
            viewModel={viewModel}
          />
        </dd>
      </div>
    </dl>
  </Section>
);

export default ReservationSplitOriginalCard;
