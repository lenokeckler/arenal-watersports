import InlineText from "@/app/components/text/InlineText";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { CUSTOM_COMBO_FORM_COPY } from "../constants/CustomComboFormCopy.constants";
import type { CustomComboEquipmentCardHeaderProps } from "../models/CustomComboEquipmentCardHeaderProps.interface";
import {
  CUSTOM_COMBO_CATEGORY_BADGE_CLASS,
  CUSTOM_COMBO_CATEGORY_HEADER_CLASS,
  CUSTOM_COMBO_CATEGORY_NAME_CLASS,
} from "../styles/CustomComboEquipmentSelection.styles";

const CustomComboEquipmentCardHeader = ({
  category,
}: CustomComboEquipmentCardHeaderProps): React.JSX.Element => (
  <div className={CUSTOM_COMBO_CATEGORY_HEADER_CLASS}>
    <Title
      className={CUSTOM_COMBO_CATEGORY_NAME_CLASS}
      text={category.name}
      variant={TitleVariant.AUXILIAR}
    />
    {category.isGuideOnly ? (
      <InlineText
        className={CUSTOM_COMBO_CATEGORY_BADGE_CLASS}
      >
        {CUSTOM_COMBO_FORM_COPY.TOUR_BADGE}
      </InlineText>
    ) : null}
  </div>
);

export default CustomComboEquipmentCardHeader;
