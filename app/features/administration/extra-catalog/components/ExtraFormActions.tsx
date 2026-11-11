import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_FORM_SUBMIT_LABEL } from "../constants/ExtraFormModeCopy.constants";
import type { ExtraFormActionsProps } from "../models/ExtraFormActionsProps.interface";
import {
  EXTRA_FORM_ACTION_BUTTON_CLASS,
  EXTRA_FORM_ACTIONS_CLASS,
} from "../styles/ExtraForm.styles";

const ExtraFormActions = ({
  mode,
  isSubmitting,
  onBack,
}: ExtraFormActionsProps): React.JSX.Element => (
  <div className={EXTRA_FORM_ACTIONS_CLASS}>
    <Button
      variant={BUTTON.SECONDARY}
      type="button"
      disabled={isSubmitting}
      onClick={onBack}
      className={EXTRA_FORM_ACTION_BUTTON_CLASS}
    >
      {EXTRA_CATALOG_COPY.CANCEL_BUTTON}
    </Button>
    <Button
      variant={BUTTON.PRIMARY}
      type="submit"
      isLoading={isSubmitting}
      loadingText={EXTRA_CATALOG_COPY.LOADING_TEXT_SAVING}
      className={EXTRA_FORM_ACTION_BUTTON_CLASS}
    >
      {EXTRA_FORM_SUBMIT_LABEL[mode]}
    </Button>
  </div>
);

export default ExtraFormActions;
