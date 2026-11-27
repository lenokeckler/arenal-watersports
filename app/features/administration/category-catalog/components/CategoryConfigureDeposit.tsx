import { CURRENCY_CODE } from "@/app/constants";
import Text from "@/app/components/text/Text";
import { CATEGORY_CONFIGURE_COPY } from "../constants/CategoryConfigureCopy.constants";
import type { CategoryConfigureDepositProps } from "../models/CategoryConfigureDepositProps.interface";
import {
  CATEGORY_CONFIGURE_BODY_CLASS,
  CATEGORY_CONFIGURE_BODY_HELP_CLASS,
} from "../styles/CategoryConfigureBody.styles";
import CategoryDepositAmountField from "./CategoryDepositAmountField";

const CategoryConfigureDeposit = ({
  values,
  errors,
  onDepositUsdChange,
  onDepositCrcChange,
}: CategoryConfigureDepositProps): React.JSX.Element => (
  <div className={CATEGORY_CONFIGURE_BODY_CLASS}>
    <CategoryDepositAmountField
      currency={CURRENCY_CODE.USD}
      value={values.depositUsd}
      error={errors.depositUsd}
      onChange={onDepositUsdChange}
    />
    <CategoryDepositAmountField
      currency={CURRENCY_CODE.CRC}
      value={values.depositCrc}
      error={errors.depositCrc}
      onChange={onDepositCrcChange}
    />
    <Text className={CATEGORY_CONFIGURE_BODY_HELP_CLASS}>
      {CATEGORY_CONFIGURE_COPY.DEPOSIT_HELP}
    </Text>
  </div>
);

export default CategoryConfigureDeposit;
