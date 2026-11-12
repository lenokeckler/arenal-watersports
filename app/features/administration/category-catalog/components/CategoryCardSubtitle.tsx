import Text from "@/app/components/text/Text";
import type { CategoryCardSubtitleProps } from "../models/CategoryCardSubtitleProps.interface";
import { resolveCategoryCardSubtitleClassName } from "../styles/CategoryCard.styles";

const CategoryCardSubtitle = ({
  subtitle,
  isInactive,
}: CategoryCardSubtitleProps): React.JSX.Element => (
  <Text
    className={resolveCategoryCardSubtitleClassName(
      isInactive
    )}
  >
    {subtitle}
  </Text>
);

export default CategoryCardSubtitle;
