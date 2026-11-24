import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";
import type { TariffFormActionsProps } from "../models/TariffFormActionsProps.interface";
import {
  TARIFF_FORM_ACTION_BUTTON_CLASS,
  TARIFF_FORM_ACTIONS_CLASS,
} from "../styles/TariffForm.styles";

const TariffFormActions = ({
  isSubmitting,
  onBack,
}: TariffFormActionsProps): React.JSX.Element => (
  <div className={TARIFF_FORM_ACTIONS_CLASS}>
    <Button
      variant={BUTTON.SECONDARY}
      type="button"
      disabled={isSubmitting}
      onClick={onBack}
      className={TARIFF_FORM_ACTION_BUTTON_CLASS}
    >
      {TARIFF_FORM_COPY.BACK_BUTTON}
    </Button>
    <Button
      variant={BUTTON.PRIMARY}
      type="submit"
      isLoading={isSubmitting}
      loadingText={TARIFF_FORM_COPY.SAVING_TEXT}
      className={TARIFF_FORM_ACTION_BUTTON_CLASS}
    >
      {TARIFF_FORM_COPY.SAVE_BUTTON}
    </Button>
  </div>
);

export default TariffFormActions;
