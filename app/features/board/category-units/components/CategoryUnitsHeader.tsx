import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsHeaderProps } from "../models/CategoryUnitsHeaderProps.interface";
import {
  CATEGORY_UNITS_HEADER_CLASS,
  CATEGORY_UNITS_SUBTITLE_CLASS,
  CATEGORY_UNITS_TITLE_CLASS,
} from "../styles/CategoryUnits.styles";
import CategoryUnitsBackLink from "./CategoryUnitsBackLink";

const CategoryUnitsHeader = ({
  categoryName,
  unitCount,
}: CategoryUnitsHeaderProps): React.JSX.Element => (
  <header className={CATEGORY_UNITS_HEADER_CLASS}>
    <CategoryUnitsBackLink />
    <Title
      variant={TitleVariant.PRIMARY}
      text={categoryName}
      className={CATEGORY_UNITS_TITLE_CLASS}
    />
    <Text className={CATEGORY_UNITS_SUBTITLE_CLASS}>
      {CATEGORY_UNITS_COPY.UNITS_COUNT(unitCount)}
    </Text>
  </header>
);

export default CategoryUnitsHeader;
