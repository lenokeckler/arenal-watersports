import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { RESERVATION_SPLIT_FIELD_ID } from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitCardProps } from "../models/ReservationSplitCardProps.interface";
import {
  RESERVATION_SPLIT_CARD_HEADING_CLASS,
  RESERVATION_SPLIT_CODE_CLASS,
  RESERVATION_SPLIT_DETAILS_CLASS,
  RESERVATION_SPLIT_HINT_CLASS,
  RESERVATION_SPLIT_ORIGINAL_CLASS,
  RESERVATION_SPLIT_TERM_CLASS,
  resolveReservationSplitDefinitionClassName,
} from "../styles/ReservationSplitCards.styles";
import { buildReservationSplitSummaryRows } from "../utils/buildReservationSplitSummaryRows";
import ReservationSplitOriginalEquipment from "./ReservationSplitOriginalEquipment";

const ReservationSplitOriginalCard = ({
  split,
  viewModel,
}: ReservationSplitCardProps): React.JSX.Element => (
  <Section
    ariaLabel={RESERVATION_SPLIT_FIELD_ID.ORIGINAL_HEADING}
    className={RESERVATION_SPLIT_ORIGINAL_CLASS}
  >
    <div>
      <Title
        id={RESERVATION_SPLIT_FIELD_ID.ORIGINAL_HEADING}
        variant={TitleVariant.SECONDARY}
        text={RESERVATION_SPLIT_UI_COPY.ORIGINAL_HEADING}
        className={RESERVATION_SPLIT_CARD_HEADING_CLASS}
      />
      <Text className={RESERVATION_SPLIT_CODE_CLASS}>
        {split.code}
      </Text>
    </div>
    <dl className={RESERVATION_SPLIT_DETAILS_CLASS}>
      {buildReservationSplitSummaryRows(
        split,
        viewModel.remainder
      ).map(
        ({ hint, isAtMinimum = false, term, value }) => (
          <div key={term}>
            <dt className={RESERVATION_SPLIT_TERM_CLASS}>
              {term}
            </dt>
            <dd
              className={resolveReservationSplitDefinitionClassName(
                isAtMinimum
              )}
            >
              {value}
              {hint && (
                <Text
                  className={RESERVATION_SPLIT_HINT_CLASS}
                >
                  {hint}
                </Text>
              )}
            </dd>
          </div>
        )
      )}
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
