import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import {
  CATEGORY_UNITS_EMPTY_CLASS,
  CATEGORY_UNITS_EMPTY_ICON_CLASS,
  CATEGORY_UNITS_STATE_BODY_CLASS,
  CATEGORY_UNITS_STATE_TITLE_CLASS,
} from "../styles/CategoryUnitsState.styles";

const CategoryUnitsEmpty = (): React.JSX.Element => (
  <div className={CATEGORY_UNITS_EMPTY_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.SAILING}
      className={CATEGORY_UNITS_EMPTY_ICON_CLASS}
    />
    <Text className={CATEGORY_UNITS_STATE_TITLE_CLASS}>
      {CATEGORY_UNITS_COPY.EMPTY_TITLE}
    </Text>
    <Text className={CATEGORY_UNITS_STATE_BODY_CLASS}>
      {CATEGORY_UNITS_COPY.EMPTY_BODY}
    </Text>
  </div>
);

export default CategoryUnitsEmpty;
