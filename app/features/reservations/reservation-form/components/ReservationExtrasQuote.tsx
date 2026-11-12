import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import type { NullableRef } from "@/app/types";
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
}: ReservationExtrasComponentProps): React.JSX.Element => (
  <div className={RESERVATION_EXTRAS_QUOTE_TOTALS_CLASS}>
    <Text className={RESERVATION_EXTRAS_QUOTE_AMOUNT_CLASS}>
      {CUSTOM_COMBO_FORM_CURRENCY.CRC}:{" "}
      {formatCustomComboAmount(
        viewModel.extras.pricing?.listAmountCrc ?? null,
        CUSTOM_COMBO_FORM_CURRENCY.CRC
      )}
    </Text>
    <Text className={RESERVATION_EXTRAS_QUOTE_AMOUNT_CLASS}>
      {CUSTOM_COMBO_FORM_CURRENCY.USD}:{" "}
      {formatCustomComboAmount(
        viewModel.extras.pricing?.listAmountUsd ?? null,
        CUSTOM_COMBO_FORM_CURRENCY.USD
      )}
    </Text>
  </div>
);

const ReservationExtrasQuoteError = ({
  viewModel,
}: ReservationExtrasComponentProps): React.JSX.Element => (
  <div
    className={RESERVATION_EXTRAS_ERROR_CLASS}
    role={ARIA_ROLE.ALERT}
  >
    <Text>{RESERVATION_FORM_UI_COPY.QUOTE_ERROR}</Text>
    <Button
      className={RESERVATION_EXTRAS_RETRY_CLASS}
      disabled={viewModel.extras.isPricingLoading}
      onClick={viewModel.extras.retryPricing}
      type="button"
      variant={BUTTON.SECONDARY}
    >
      {RESERVATION_FORM_UI_COPY.QUOTE_RETRY}
    </Button>
  </div>
);

const ReservationExtrasQuoteWarnings = ({
  viewModel,
}: ReservationExtrasComponentProps): React.JSX.Element => {
  const pricing = viewModel.extras.pricing;
  const hasSelectedExtras =
    (viewModel.values.extraIds ?? []).length > 0;
  return (
    <>
      {!pricing?.hasBoatTariff && hasSelectedExtras ? (
        <Text className={RESERVATION_EXTRAS_FEEDBACK_CLASS}>
          {RESERVATION_FORM_UI_COPY.QUOTE_MISSING_TARIFF}
        </Text>
      ) : null}
      {pricing?.hasBoatTariff &&
      (pricing.listAmountCrc === null ||
        pricing.listAmountUsd === null) ? (
        <Text className={RESERVATION_EXTRAS_FEEDBACK_CLASS}>
          {RESERVATION_FORM_UI_COPY.QUOTE_MISSING_CURRENCY}
        </Text>
      ) : null}
    </>
  );
};

const ReservationExtrasQuoteContent = ({
  viewModel,
}: ReservationExtrasComponentProps): NullableRef<React.JSX.Element> => {
  const { extras } = viewModel;
  if (extras.isPricingLoading) {
    return (
      <Text role={ARIA_ROLE.STATUS}>
        {RESERVATION_FORM_UI_COPY.QUOTE_LOADING}
      </Text>
    );
  }
  if (extras.pricingError) {
    return (
      <ReservationExtrasQuoteError viewModel={viewModel} />
    );
  }
  if (!extras.pricing) {
    return null;
  }
  return (
    <>
      <ReservationExtrasQuoteWarnings
        viewModel={viewModel}
      />
      <ReservationExtrasQuoteAmounts
        viewModel={viewModel}
      />
    </>
  );
};

const ReservationExtrasQuote = ({
  viewModel,
}: ReservationExtrasComponentProps): React.JSX.Element => (
  <div className={RESERVATION_EXTRAS_QUOTE_CLASS}>
    <Text bold>{RESERVATION_FORM_UI_COPY.QUOTE_TITLE}</Text>
    <Text>
      {RESERVATION_FORM_UI_COPY.QUOTE_CURRENCY_NOTE}
    </Text>
    <ReservationExtrasQuoteContent viewModel={viewModel} />
  </div>
);

export default ReservationExtrasQuote;
