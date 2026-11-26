"use client";

import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  TitleVariant,
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
  COMBO_FORM_FORM_CLASS,
  COMBO_FORM_HEADER_CLASS,
  COMBO_FORM_SUBTITLE_CLASS,
  COMBO_FORM_TITLE_CLASS,
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
      <div className={COMBO_FORM_HEADER_CLASS}>
        <Title
          id={ADMINISTRATION_SCREEN_TITLE_ID}
          variant={TitleVariant.PRIMARY}
          text={viewModel.title}
          className={COMBO_FORM_TITLE_CLASS}
        />
        <Text
          id={COMBO_FORM_FIELD_ID.HINT}
          className={COMBO_FORM_SUBTITLE_CLASS}
        >
          {COMBO_FORM_COPY.FORM_PURPOSE}
        </Text>
      </div>
      <form
        onSubmit={viewModel.onSubmit}
        className={COMBO_FORM_FORM_CLASS}
      >
        <div className={COMBO_FORM_CARD_CLASS}>
          <ComboFormFields {...viewModel} />
        </div>
        <ComboFormActions
          isSubmitting={viewModel.isSubmitting}
          onBack={viewModel.onBack}
        />
      </form>
    </div>
  );
};

export default ComboFormView;
