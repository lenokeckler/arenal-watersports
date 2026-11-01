import Text from "@/app/components/text/Text";
import type { CategoryCardTrackingModeProps } from "../models/CategoryCardTrackingModeProps.interface";
import { CATEGORY_CARD_TRACKING_MODE_CLASS } from "../styles/CategoryCard.styles";

const CategoryCardTrackingMode = ({
  label,
}: CategoryCardTrackingModeProps): React.JSX.Element => (
  <Text className={CATEGORY_CARD_TRACKING_MODE_CLASS}>
    {label}
  </Text>
);

export default CategoryCardTrackingMode;
