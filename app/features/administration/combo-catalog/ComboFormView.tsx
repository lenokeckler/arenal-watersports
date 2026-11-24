"use client";

import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  WIDE_LAYOUT_MARKER_PROPS,
} from "@/app/constants";
import ComboFormActions from "./components/ComboFormActions";
import ComboFormFields from "./components/ComboFormFields";
import { COMBO_FORM_COPY } from "./constants/ComboFormCopy.constants";
import { COMBO_FORM_FIELD_ID } from "./constants/ComboFormFieldId.constants";
import { useComboFormViewModel } from "./hooks/useComboFormViewModel";
import type { ComboFormViewProps } from "./models/ComboFormViewProps.interface";
import {
  COMBO_FORM_CARD_CLASS,
  COMBO_FORM_CONTENT_CLASS,
} from "./styles/ComboForm.styles";

const ComboFormView = (
  props: ComboFormViewProps
): React.JSX.Element => {
  const viewModel = useComboFormViewModel(props);

  return (
    <div
      className={COMBO_FORM_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <ScreenHeading
        title={viewModel.title}
        titleId={ADMINISTRATION_SCREEN_TITLE_ID}
        hasLogo={false}
        instruction={COMBO_FORM_COPY.FORM_PURPOSE}
        instructionId={COMBO_FORM_FIELD_ID.HINT}
      />
      <form onSubmit={viewModel.onSubmit}>
        <div className={COMBO_FORM_CARD_CLASS}>
          <ComboFormFields {...viewModel} />
          <ComboFormActions
            isSubmitting={viewModel.isSubmitting}
            onBack={viewModel.onBack}
          />
        </div>
      </form>
    </div>
  );
};

export default ComboFormView;
