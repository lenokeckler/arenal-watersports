import { MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { INCOME_NO_MOVEMENT_COPY } from "../constants/IncomeCopy.constants";
import type { IncomeNoMovementProps } from "../models/IncomeNoMovementProps.interface";
import {
  INCOME_NO_MOVEMENT_CLASS,
  INCOME_NO_MOVEMENT_ICON_CLASS,
  INCOME_STATE_BODY_CLASS,
} from "../styles/IncomeState.styles";

const IncomeNoMovement = ({
  currency,
}: IncomeNoMovementProps): React.JSX.Element => (
  <div className={INCOME_NO_MOVEMENT_CLASS}>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.PAYMENTS}
      className={INCOME_NO_MOVEMENT_ICON_CLASS}
    />
    <Text className={INCOME_STATE_BODY_CLASS}>
      {INCOME_NO_MOVEMENT_COPY[currency]}
    </Text>
  </div>
);

export default IncomeNoMovement;
