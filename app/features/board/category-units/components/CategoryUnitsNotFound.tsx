import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { CATEGORY_UNITS_PAGE_CLASS } from "../styles/CategoryUnits.styles";
import {
  CATEGORY_UNITS_EMPTY_CLASS,
  CATEGORY_UNITS_EMPTY_ICON_CLASS,
  CATEGORY_UNITS_STATE_BODY_CLASS,
  CATEGORY_UNITS_STATE_TITLE_CLASS,
} from "../styles/CategoryUnitsState.styles";
import CategoryUnitsBackLink from "./CategoryUnitsBackLink";

const CategoryUnitsNotFound = (): React.JSX.Element => (
  <main className={CATEGORY_UNITS_PAGE_CLASS}>
    <CategoryUnitsBackLink />
    <div className={CATEGORY_UNITS_EMPTY_CLASS}>
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ERROR}
        className={CATEGORY_UNITS_EMPTY_ICON_CLASS}
      />
      <Text className={CATEGORY_UNITS_STATE_TITLE_CLASS}>
        {CATEGORY_UNITS_COPY.NOT_FOUND_TITLE}
      </Text>
      <Text className={CATEGORY_UNITS_STATE_BODY_CLASS}>
        {CATEGORY_UNITS_COPY.NOT_FOUND_BODY}
      </Text>
    </div>
  </main>
);

export default CategoryUnitsNotFound;
