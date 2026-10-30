import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { INCOME_COPY } from "../constants/IncomeCopy.constants";
import {
  INCOME_EMPTY_CLASS,
  INCOME_EMPTY_ICON_CLASS,
  INCOME_STATE_BODY_CLASS,
  INCOME_STATE_TITLE_CLASS,
} from "../styles/IncomeState.styles";

const IncomeEmpty = (): React.JSX.Element => (
  <div className={INCOME_EMPTY_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.EVENT_AVAILABLE}
      className={INCOME_EMPTY_ICON_CLASS}
    />
    <Text className={INCOME_STATE_TITLE_CLASS}>
      {INCOME_COPY.EMPTY_TITLE}
    </Text>
    <Text className={INCOME_STATE_BODY_CLASS}>
      {INCOME_COPY.EMPTY_BODY}
    </Text>
  </div>
);

export default IncomeEmpty;
