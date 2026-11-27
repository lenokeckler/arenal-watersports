"use client";

import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  TitleVariant,
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
  TARIFF_FORM_EYEBROW_CLASS,
  TARIFF_FORM_FORM_CLASS,
  TARIFF_FORM_HEADER_CLASS,
  TARIFF_FORM_NOTE_CLASS,
  TARIFF_FORM_NOTE_ICON_CLASS,
  TARIFF_FORM_TITLE_CLASS,
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
      <div className={TARIFF_FORM_HEADER_CLASS}>
        <Text className={TARIFF_FORM_EYEBROW_CLASS}>
          {TARIFF_FORM_COPY.TITLE_EDIT}
        </Text>
        <Title
          id={ADMINISTRATION_SCREEN_TITLE_ID}
          variant={TitleVariant.PRIMARY}
          text={viewModel.title}
          className={TARIFF_FORM_TITLE_CLASS}
        />
      </div>
      <div className={TARIFF_FORM_NOTE_CLASS}>
        <MaterialIcon
          name={MATERIAL_ICON_NAME.INFO}
          className={TARIFF_FORM_NOTE_ICON_CLASS}
        />
        <Text id={TARIFF_FORM_HINT_ID}>
          {TARIFF_FORM_COPY.CHANGE_HINT}
        </Text>
      </div>
      <form
        onSubmit={viewModel.onSubmit}
        className={TARIFF_FORM_FORM_CLASS}
      >
        <div className={TARIFF_FORM_CARD_CLASS}>
          <TariffFormFields {...viewModel} />
        </div>
        <TariffFormActions
          isSubmitting={viewModel.isSubmitting}
          onBack={viewModel.onBack}
        />
      </form>
    </div>
  );
};

export default TariffFormView;
