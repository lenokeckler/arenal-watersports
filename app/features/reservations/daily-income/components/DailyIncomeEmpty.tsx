import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { DAILY_INCOME_COPY } from "../constants/DailyIncomeCopy.constants";
import {
  DAILY_INCOME_EMPTY_CLASS,
  DAILY_INCOME_EMPTY_ICON_CLASS,
  DAILY_INCOME_STATE_BODY_CLASS,
  DAILY_INCOME_STATE_TITLE_CLASS,
} from "../styles/DailyIncomeState.styles";

const DailyIncomeEmpty = (): React.JSX.Element => (
  <div className={DAILY_INCOME_EMPTY_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.EVENT_AVAILABLE}
      className={DAILY_INCOME_EMPTY_ICON_CLASS}
    />
    <Text className={DAILY_INCOME_STATE_TITLE_CLASS}>
      {DAILY_INCOME_COPY.EMPTY_TITLE}
    </Text>
    <Text className={DAILY_INCOME_STATE_BODY_CLASS}>
      {DAILY_INCOME_COPY.EMPTY_BODY}
    </Text>
  </div>
);

export default DailyIncomeEmpty;
