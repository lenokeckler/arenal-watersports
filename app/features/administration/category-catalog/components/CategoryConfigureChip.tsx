import InlineText from "@/app/components/text/InlineText";
import type { CategoryConfigureChipProps } from "../models/CategoryConfigureChipProps.interface";
import {
  CATEGORY_CONFIGURE_CHIP_CLASS,
  CATEGORY_CONFIGURE_CHIP_DOT_CLASS,
} from "../styles/CategoryConfigureChip.styles";

const CategoryConfigureChip = ({
  label,
  tone,
}: CategoryConfigureChipProps): React.JSX.Element => (
  <div className={CATEGORY_CONFIGURE_CHIP_CLASS[tone]}>
    <div
      aria-hidden="true"
      className={CATEGORY_CONFIGURE_CHIP_DOT_CLASS[tone]}
    />
    <InlineText>{label}</InlineText>
  </div>
);

export default CategoryConfigureChip;
