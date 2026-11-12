import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import type { StockCountSectionProps } from "../models/StockCountSectionProps.interface";
import {
  STOCK_COUNT_FORM_CARD_CLASS,
  STOCK_COUNT_FORM_ERROR_CLASS,
} from "../styles/StockCount.styles";
import StockCountActions from "./StockCountActions";
import StockExpiryField from "./StockExpiryField";
import StockQuantityFields from "./StockQuantityFields";
import StockReasonField from "./StockReasonField";
import StockSummary from "./StockSummary";

const StockCountForm = ({
  hasExpiryAlert,
  viewModel,
}: StockCountSectionProps): React.JSX.Element => {
  const {
    changes,
    errors,
    handlers,
    isSubmitting,
    values,
  } = viewModel;

  return (
    <form onSubmit={viewModel.onSubmit}>
      <div className={STOCK_COUNT_FORM_CARD_CLASS}>
        <StockQuantityFields
          changes={changes}
          disabled={isSubmitting}
          errors={errors}
          handlers={handlers}
          values={values}
        />
        <StockSummary summary={viewModel.summary} />
        {hasExpiryAlert && (
          <StockExpiryField
            disabled={isSubmitting}
            error={errors.expiryDate}
            onChange={handlers.onExpiryDateChange}
            value={values.expiryDate}
          />
        )}
        <StockReasonField
          disabled={isSubmitting}
          onChange={handlers.onReasonChange}
          value={values.reason}
        />
        {errors.form && (
          <Text
            role={ARIA_ROLE.ALERT}
            className={STOCK_COUNT_FORM_ERROR_CLASS}
          >
            {errors.form}
          </Text>
        )}
        <StockCountActions
          isSubmitting={isSubmitting}
          onBack={viewModel.onBack}
        />
      </div>
    </form>
  );
};

export default StockCountForm;
