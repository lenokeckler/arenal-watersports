import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { DAILY_INCOME_NO_MOVEMENT_COPY } from "../constants/DailyIncomeCopy.constants";
import type { CurrencyNoMovementProps } from "../models/CurrencyNoMovementProps.interface";
import {
  CURRENCY_NO_MOVEMENT_CLASS,
  CURRENCY_NO_MOVEMENT_ICON_CLASS,
  DAILY_INCOME_STATE_BODY_CLASS,
} from "../styles/DailyIncomeState.styles";

const CurrencyNoMovement = ({
  currency,
}: CurrencyNoMovementProps): React.JSX.Element => (
  <div className={CURRENCY_NO_MOVEMENT_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.PAYMENTS}
      className={CURRENCY_NO_MOVEMENT_ICON_CLASS}
    />
    <Text className={DAILY_INCOME_STATE_BODY_CLASS}>
      {DAILY_INCOME_NO_MOVEMENT_COPY[currency]}
    </Text>
  </div>
);

export default CurrencyNoMovement;
