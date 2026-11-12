import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { STRING } from "@/app/constants";
import { CATEGORY_GROUP_PREFIX_LABEL } from "../constants/CategoryGroupPrefixLabel.constants";
import type { CategoryCardGroupRowProps } from "../models/CategoryCardGroupRowProps.interface";
import {
  CATEGORY_CARD_GROUP_PREFIX_CLASS,
  CATEGORY_CARD_GROUP_ROW_CLASS,
} from "../styles/CategoryCard.styles";

const CategoryCardGroupRow = ({
  groupName,
}: CategoryCardGroupRowProps): React.JSX.Element => (
  <Text className={CATEGORY_CARD_GROUP_ROW_CLASS}>
    <InlineText
      className={CATEGORY_CARD_GROUP_PREFIX_CLASS}
    >
      {CATEGORY_GROUP_PREFIX_LABEL}
    </InlineText>
    {STRING.SPACE}
    {groupName}
  </Text>
);

export default CategoryCardGroupRow;
