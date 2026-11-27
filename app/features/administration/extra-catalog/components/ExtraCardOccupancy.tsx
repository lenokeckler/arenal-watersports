import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import InlineText from "@/app/components/text/InlineText";
import type { ExtraCardOccupancyLabelProps } from "../models/ExtraCardOccupancyLabelProps.interface";
import {
  EXTRA_CARD_FACT_CLASS,
  EXTRA_CARD_FACT_ICON_CLASS,
} from "../styles/ExtraCard.styles";

const ExtraCardOccupancy = ({
  label,
}: ExtraCardOccupancyLabelProps): React.JSX.Element => (
  <InlineText className={EXTRA_CARD_FACT_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.INVENTORY_2}
      className={EXTRA_CARD_FACT_ICON_CLASS}
    />
    <InlineText>{label}</InlineText>
  </InlineText>
);

export default ExtraCardOccupancy;
