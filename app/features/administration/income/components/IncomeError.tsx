import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { ARIA_ROLE } from "@/app/constants";
import { INCOME_COPY } from "../constants/IncomeCopy.constants";
import {
  INCOME_ERROR_BODY_CLASS,
  INCOME_ERROR_CLASS,
  INCOME_ERROR_ICON_CLASS,
  INCOME_ERROR_TEXT_CLASS,
  INCOME_ERROR_TITLE_CLASS,
} from "../styles/IncomeState.styles";

const IncomeError = (): React.JSX.Element => (
  <div
    role={ARIA_ROLE.ALERT}
    className={INCOME_ERROR_CLASS}
  >
    <MaterialIcon
      name={MATERIAL_ICON_NAME.ERROR}
      className={INCOME_ERROR_ICON_CLASS}
    />
    <div className={INCOME_ERROR_TEXT_CLASS}>
      <Text className={INCOME_ERROR_TITLE_CLASS}>
        {INCOME_COPY.ERROR_TITLE}
      </Text>
      <Text className={INCOME_ERROR_BODY_CLASS}>
        {INCOME_COPY.ERROR_BODY}
      </Text>
    </div>
  </div>
);

export default IncomeError;
