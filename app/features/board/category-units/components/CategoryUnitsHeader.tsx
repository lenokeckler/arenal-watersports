import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitsHeaderProps } from "../models/CategoryUnitsHeaderProps.interface";
import {
  CATEGORY_UNITS_HEADER_CLASS,
  CATEGORY_UNITS_SUBTITLE_CLASS,
  CATEGORY_UNITS_TITLE_CLASS,
} from "../styles/CategoryUnits.styles";
import {
  CATEGORY_UNITS_HEADER_ACTIONS_CLASS,
  CATEGORY_UNITS_HEADER_ROW_CLASS,
  CATEGORY_UNITS_HEADER_TEXT_CLASS,
} from "../styles/CategoryUnitSheets.styles";
import CategoryUnitsBackLink from "./CategoryUnitsBackLink";

const CategoryUnitsHeader = ({
  categoryName,
  children,
  unitCount,
}: CategoryUnitsHeaderProps): React.JSX.Element => (
  <header className={CATEGORY_UNITS_HEADER_CLASS}>
    <CategoryUnitsBackLink />
    <div className={CATEGORY_UNITS_HEADER_ROW_CLASS}>
      <div className={CATEGORY_UNITS_HEADER_TEXT_CLASS}>
        <Title
          variant={TitleVariant.PRIMARY}
          text={categoryName}
          className={CATEGORY_UNITS_TITLE_CLASS}
        />
      </div>
      <div className={CATEGORY_UNITS_HEADER_ACTIONS_CLASS}>
        <Text className={CATEGORY_UNITS_SUBTITLE_CLASS}>
          {CATEGORY_UNITS_COPY.UNITS_COUNT(unitCount)}
        </Text>
        {children}
      </div>
    </div>
  </header>
);

export default CategoryUnitsHeader;
