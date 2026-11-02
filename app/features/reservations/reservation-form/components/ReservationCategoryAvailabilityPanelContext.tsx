import Text from "@/app/components/text/Text";
import { STRING } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationCategoryAvailabilityPanelContextProps } from "../models/ReservationCategoryAvailabilityPanelContextProps.interface";
import {
  RESERVATION_CATEGORY_AVAILABILITY_CONTEXT_CLASS,
  RESERVATION_CATEGORY_AVAILABILITY_STATUS_CLASS,
} from "../styles/ReservationCategoryAvailabilityPanel.styles";

const ReservationCategoryAvailabilityPanelContext = ({
  categoryName,
  intervalLabel,
}: ReservationCategoryAvailabilityPanelContextProps): React.JSX.Element => (
  <div>
    <Text
      className={
        RESERVATION_CATEGORY_AVAILABILITY_CONTEXT_CLASS
      }
    >
      {RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY}
    </Text>
    <Text
      bold
      className={
        RESERVATION_CATEGORY_AVAILABILITY_STATUS_CLASS
      }
    >
      {categoryName}
      {intervalLabel ? ` · ${intervalLabel}` : STRING.Empty}
    </Text>
    <Text
      className={
        RESERVATION_CATEGORY_AVAILABILITY_CONTEXT_CLASS
      }
    >
      {
        RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY_CONTEXT
      }
    </Text>
  </div>
);

export default ReservationCategoryAvailabilityPanelContext;
