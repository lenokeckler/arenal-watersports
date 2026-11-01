import { CURRENCY_CODE } from "@/app/constants";
import type { CategoryDepositFormFieldsProps } from "../models/CategoryDepositFormFieldsProps.interface";
import CategoryDepositAmountField from "./CategoryDepositAmountField";

const CategoryDepositFormFields = ({
  values,
  errors,
  isSubmitting,
  onDepositUsdChange,
  onDepositCrcChange,
}: CategoryDepositFormFieldsProps): React.JSX.Element => (
  <>
    <CategoryDepositAmountField
      currency={CURRENCY_CODE.USD}
      value={values.depositUsd}
      error={errors.depositUsd}
      disabled={isSubmitting}
      onChange={onDepositUsdChange}
    />
    <CategoryDepositAmountField
      currency={CURRENCY_CODE.CRC}
      value={values.depositCrc}
      error={errors.depositCrc}
      disabled={isSubmitting}
      onChange={onDepositCrcChange}
    />
  </>
);

export default CategoryDepositFormFields;
