import { Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import type { CategoryUnitsHeaderProps } from "../models/CategoryUnitsHeaderProps.interface";
import {
  CATEGORY_UNITS_HEADER_CLASS,
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
  filterControl,
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
        {filterControl}
        {children}
      </div>
    </div>
  </header>
);

export default CategoryUnitsHeader;
