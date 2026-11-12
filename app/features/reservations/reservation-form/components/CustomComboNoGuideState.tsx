import Text from "@/app/components/text/Text";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_STATUS_CLASS } from "../styles/ReservationFormView.styles";

const CustomComboNoGuideState = (): React.JSX.Element => (
  <Text
    aria-label={CUSTOM_COMBO_FORM_COPY.NO_GUIDE}
    className={RESERVATION_FORM_STATUS_CLASS}
    role="status"
  >
    {CUSTOM_COMBO_FORM_COPY.NO_GUIDE}
  </Text>
);

export default CustomComboNoGuideState;
