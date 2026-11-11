import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { BUTTON, TitleVariant } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD_ID } from "../constants/ReservationFormUi.constants";
import type { ReservationFormHeaderProps } from "../models/ReservationFormHeaderProps.interface";
import {
  RESERVATION_FORM_BACK_CLASS,
  RESERVATION_FORM_DESCRIPTION_CLASS,
  RESERVATION_FORM_HEADER_CLASS,
  RESERVATION_FORM_TITLE_CLASS,
} from "../styles/ReservationFormView.styles";

const ReservationFormHeader = ({
  copy = RESERVATION_FORM_UI_COPY,
  viewModel,
}: ReservationFormHeaderProps): React.JSX.Element => (
  <header className={RESERVATION_FORM_HEADER_CLASS}>
    <Button
      type="button"
      variant={BUTTON.BASE}
      className={RESERVATION_FORM_BACK_CLASS}
      onClick={viewModel.handleBack}
    >
      {RESERVATION_FORM_UI_COPY.BACK_TO_CALENDAR}
    </Button>
    <Title
      id={RESERVATION_FORM_FIELD_ID.HEADING}
      variant={TitleVariant.PRIMARY}
      text={copy.TITLE}
      className={RESERVATION_FORM_TITLE_CLASS}
    />
    <Text className={RESERVATION_FORM_DESCRIPTION_CLASS}>
      {copy.DESCRIPTION}
    </Text>
  </header>
);

export default ReservationFormHeader;
