"use client";

import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  WIDE_LAYOUT_MARKER_PROPS,
} from "@/app/constants";
import TariffFormActions from "./components/TariffFormActions";
import TariffFormFields from "./components/TariffFormFields";
import { TARIFF_FORM_COPY } from "./constants/TariffFormCopy.constants";
import { TARIFF_FORM_HINT_ID } from "./constants/TariffFormFieldId.constants";
import { useTariffFormViewModel } from "./hooks/useTariffFormViewModel";
import type { TariffFormViewProps } from "./models/TariffFormViewProps.interface";
import {
  TARIFF_FORM_CARD_CLASS,
  TARIFF_FORM_CONTENT_CLASS,
} from "./styles/TariffForm.styles";

const TariffFormView = (
  props: TariffFormViewProps
): React.JSX.Element => {
  const viewModel = useTariffFormViewModel(props);

  return (
    <div
      className={TARIFF_FORM_CONTENT_CLASS}
      {...WIDE_LAYOUT_MARKER_PROPS}
    >
      <ScreenHeading
        title={viewModel.title}
        titleId={ADMINISTRATION_SCREEN_TITLE_ID}
        hasLogo={false}
        instruction={TARIFF_FORM_COPY.CHANGE_HINT}
        instructionId={TARIFF_FORM_HINT_ID}
      />
      <form onSubmit={viewModel.onSubmit}>
        <div className={TARIFF_FORM_CARD_CLASS}>
          <TariffFormFields {...viewModel} />
          <TariffFormActions
            isSubmitting={viewModel.isSubmitting}
            onBack={viewModel.onBack}
          />
        </div>
      </form>
    </div>
  );
};

export default TariffFormView;
