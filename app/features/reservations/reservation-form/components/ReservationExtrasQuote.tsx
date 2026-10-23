import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { CUSTOM_COMBO_FORM_CURRENCY } from "../constants/CustomComboFormCopy.constants";
import type { ReservationExtrasComponentProps } from "../models/ReservationExtrasComponentProps.interface";
import { formatCustomComboAmount } from "../utils/formatCustomComboAmount";
import {
  RESERVATION_EXTRAS_ERROR_CLASS,
  RESERVATION_EXTRAS_FEEDBACK_CLASS,
  RESERVATION_EXTRAS_QUOTE_AMOUNT_CLASS,
  RESERVATION_EXTRAS_QUOTE_CLASS,
  RESERVATION_EXTRAS_QUOTE_TOTALS_CLASS,
  RESERVATION_EXTRAS_RETRY_CLASS,
} from "../styles/ReservationExtras.styles";

const ReservationExtrasQuoteAmounts = ({
  viewModel,
}: ReservationExtrasComponentProps): React.JSX.Element => {
  const pricing = viewModel.extras.pricing;
  const amountCrc = pricing?.listAmountCrc ?? null;
  const amountUsd = pricing?.listAmountUsd ?? null;
  return (
    <div className={RESERVATION_EXTRAS_QUOTE_TOTALS_CLASS}>
      <Text
        className={RESERVATION_EXTRAS_QUOTE_AMOUNT_CLASS}
      >
        {CUSTOM_COMBO_FORM_CURRENCY.CRC}:{" "}
        {formatCustomComboAmount(
          amountCrc,
          CUSTOM_COMBO_FORM_CURRENCY.CRC
        )}
      </Text>
      <Text
        className={RESERVATION_EXTRAS_QUOTE_AMOUNT_CLASS}
      >
        {CUSTOM_COMBO_FORM_CURRENCY.USD}:{" "}
        {formatCustomComboAmount(
          amountUsd,
          CUSTOM_COMBO_FORM_CURRENCY.USD
        )}
      </Text>
    </div>
  );
};

const ReservationExtrasQuote = ({
  viewModel,
}: ReservationExtrasComponentProps): React.JSX.Element => {
  const { extras } = viewModel;
  const pricing = extras.pricing;

  return (
    <div className={RESERVATION_EXTRAS_QUOTE_CLASS}>
      <Text bold>
        {RESERVATION_FORM_UI_COPY.QUOTE_TITLE}
      </Text>
      <Text>
        {RESERVATION_FORM_UI_COPY.QUOTE_CURRENCY_NOTE}
      </Text>
      {extras.isPricingLoading ? (
        <Text role={ARIA_ROLE.STATUS}>
          {RESERVATION_FORM_UI_COPY.QUOTE_LOADING}
        </Text>
      ) : null}
      {extras.pricingError ? (
        <div
          className={RESERVATION_EXTRAS_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          <Text>
            {RESERVATION_FORM_UI_COPY.QUOTE_ERROR}
          </Text>
          <Button
            className={RESERVATION_EXTRAS_RETRY_CLASS}
            disabled={extras.isPricingLoading}
            onClick={extras.retryPricing}
            type="button"
            variant={BUTTON.SECONDARY}
          >
            {RESERVATION_FORM_UI_COPY.QUOTE_RETRY}
          </Button>
        </div>
      ) : null}
      {!extras.isPricingLoading &&
      !extras.pricingError &&
      pricing ? (
        <>
          {!pricing.hasBoatTariff ? (
            <Text
              className={RESERVATION_EXTRAS_FEEDBACK_CLASS}
            >
              {
                RESERVATION_FORM_UI_COPY.QUOTE_MISSING_TARIFF
              }
            </Text>
          ) : null}
          <ReservationExtrasQuoteAmounts
            viewModel={viewModel}
          />
          {pricing.hasBoatTariff &&
          (pricing.listAmountCrc === null ||
            pricing.listAmountUsd === null) ? (
            <Text
              className={RESERVATION_EXTRAS_FEEDBACK_CLASS}
            >
              {
                RESERVATION_FORM_UI_COPY.QUOTE_MISSING_CURRENCY
              }
            </Text>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default ReservationExtrasQuote;
