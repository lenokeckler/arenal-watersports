import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_ROLE } from "@/app/constants";
import { DAILY_INCOME_COPY } from "../constants/DailyIncomeCopy.constants";
import { DAILY_INCOME_PAGE_CLASS } from "../styles/DailyIncome.styles";
import {
  DAILY_INCOME_ERROR_BODY_CLASS,
  DAILY_INCOME_ERROR_CLASS,
  DAILY_INCOME_ERROR_ICON_CLASS,
  DAILY_INCOME_ERROR_TEXT_CLASS,
  DAILY_INCOME_ERROR_TITLE_CLASS,
} from "../styles/DailyIncomeState.styles";
import DailyIncomeHeader from "./DailyIncomeHeader";

const DailyIncomeError = (): React.JSX.Element => (
  <main className={DAILY_INCOME_PAGE_CLASS}>
    <DailyIncomeHeader />
    <div
      role={ARIA_ROLE.ALERT}
      className={DAILY_INCOME_ERROR_CLASS}
    >
      <MaterialIcon
        name={MATERIAL_ICON_NAME.ERROR}
        className={DAILY_INCOME_ERROR_ICON_CLASS}
      />
      <div className={DAILY_INCOME_ERROR_TEXT_CLASS}>
        <Text className={DAILY_INCOME_ERROR_TITLE_CLASS}>
          {DAILY_INCOME_COPY.ERROR_TITLE}
        </Text>
        <Text className={DAILY_INCOME_ERROR_BODY_CLASS}>
          {DAILY_INCOME_COPY.ERROR_BODY}
        </Text>
      </div>
    </div>
  </main>
);

export default DailyIncomeError;
