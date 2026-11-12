import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import {
  RESERVATION_SPLIT_FIELD_ID,
  RESERVATION_SPLIT_FOCUS,
} from "../constants/ReservationSplitUi.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitDepartureCardProps } from "../models/ReservationSplitDepartureCardProps.interface";
import {
  RESERVATION_SPLIT_CARD_HEADING_CLASS,
  RESERVATION_SPLIT_DEPARTURE_HEADER_CLASS,
  RESERVATION_SPLIT_REMOVE_CLASS,
} from "../styles/ReservationSplitCards.styles";

const ReservationSplitDepartureHeader = ({
  departureNumber,
  draft,
  viewModel,
}: ReservationSplitDepartureCardProps): React.JSX.Element => (
  <div className={RESERVATION_SPLIT_DEPARTURE_HEADER_CLASS}>
    <Title
      id={`${RESERVATION_SPLIT_FIELD_ID.HEADING_PREFIX}${draft.key}`}
      variant={TitleVariant.AUXILIAR}
      text={RESERVATION_SPLIT_UI_COPY.DEPARTURE_HEADING(
        departureNumber
      )}
      tabIndex={RESERVATION_SPLIT_FOCUS.TAB_INDEX}
      className={RESERVATION_SPLIT_CARD_HEADING_CLASS}
    />
    {viewModel.state.drafts.length >
      RESERVATION_SPLIT_DRAFT.MIN_DEPARTURES && (
      <Button
        type="button"
        variant={BUTTON.BASE}
        aria-label={RESERVATION_SPLIT_UI_COPY.REMOVE_DEPARTURE_ARIA(
          departureNumber
        )}
        className={RESERVATION_SPLIT_REMOVE_CLASS}
        onClick={() => viewModel.removeDeparture(draft.key)}
      >
        {RESERVATION_SPLIT_UI_COPY.REMOVE_DEPARTURE}
      </Button>
    )}
  </div>
);

export default ReservationSplitDepartureHeader;
