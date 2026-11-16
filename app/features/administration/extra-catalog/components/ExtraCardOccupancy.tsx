import InlineText from "@/app/components/text/InlineText";
import type { ExtraCardOccupancyLabelProps } from "../models/ExtraCardOccupancyLabelProps.interface";
import { EXTRA_CARD_OCCUPANCY_LABEL_CLASS } from "../styles/ExtraCard.styles";

const ExtraCardOccupancy = ({
  label,
}: ExtraCardOccupancyLabelProps): React.JSX.Element => (
  <InlineText className={EXTRA_CARD_OCCUPANCY_LABEL_CLASS}>
    {label}
  </InlineText>
);

export default ExtraCardOccupancy;
