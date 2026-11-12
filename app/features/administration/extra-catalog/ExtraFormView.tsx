"use client";

import { WIDE_LAYOUT_MARKER_PROPS } from "@/app/constants";
import ExtraFormActions from "./components/ExtraFormActions";
import ExtraFormFields from "./components/ExtraFormFields";
import ExtraFormHeader from "./components/ExtraFormHeader";
import { useExtraFormViewModel } from "./hooks/useExtraFormViewModel";
import type { ExtraFormViewModelProps } from "./models/ExtraFormViewModelProps.type";
import {
  EXTRA_FORM_CARD_CLASS,
  EXTRA_FORM_CONTENT_CLASS,
} from "./styles/ExtraForm.styles";

const ExtraFormView = (
  props: ExtraFormViewModelProps
): React.JSX.Element => {
  const { mode } = props;
  const {
    values,
    errors,
    isSubmitting,
    onNameChange,
    onBack,
    onSubmit,
  } = useExtraFormViewModel(props);

  return (
    <div
      className={EXTRA_FORM_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <ExtraFormHeader mode={mode} />
      <form onSubmit={onSubmit}>
        <div className={EXTRA_FORM_CARD_CLASS}>
          <ExtraFormFields
            values={values}
            errors={errors}
            isSubmitting={isSubmitting}
            onNameChange={onNameChange}
          />
          <ExtraFormActions
            mode={mode}
            isSubmitting={isSubmitting}
            onBack={onBack}
          />
        </div>
      </form>
    </div>
  );
};

export default ExtraFormView;
