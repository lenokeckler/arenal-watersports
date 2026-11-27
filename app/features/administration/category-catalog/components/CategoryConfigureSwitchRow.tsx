import Text from "@/app/components/text/Text";
import type { CategoryConfigureSwitchRowProps } from "../models/CategoryConfigureSwitchRowProps.interface";
import {
  CATEGORY_CONFIGURE_SWITCH_ROW_CLASS,
  CATEGORY_CONFIGURE_SWITCH_ROW_HELP_CLASS,
  CATEGORY_CONFIGURE_SWITCH_ROW_LABEL_CLASS,
  CATEGORY_CONFIGURE_SWITCH_ROW_TEXT_CLASS,
} from "../styles/CategoryConfigureSwitchRow.styles";
import CategoryConfigureSwitch from "./CategoryConfigureSwitch";

const CategoryConfigureSwitchRow = ({
  label,
  help,
  isChecked,
  onToggle,
}: CategoryConfigureSwitchRowProps): React.JSX.Element => (
  <div className={CATEGORY_CONFIGURE_SWITCH_ROW_CLASS}>
    <div
      className={CATEGORY_CONFIGURE_SWITCH_ROW_TEXT_CLASS}
    >
      <Text
        className={
          CATEGORY_CONFIGURE_SWITCH_ROW_LABEL_CLASS
        }
      >
        {label}
      </Text>
      <Text
        className={CATEGORY_CONFIGURE_SWITCH_ROW_HELP_CLASS}
      >
        {help}
      </Text>
    </div>
    <CategoryConfigureSwitch
      ariaLabel={label}
      isChecked={isChecked}
      onToggle={onToggle}
    />
  </div>
);

export default CategoryConfigureSwitchRow;
