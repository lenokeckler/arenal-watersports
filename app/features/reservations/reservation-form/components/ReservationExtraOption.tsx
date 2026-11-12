import FormField from "@/app/components/form-field/FormField";
import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, INPUT_TYPES } from "@/app/constants";
import { CUSTOM_COMBO_FORM_CURRENCY } from "../constants/CustomComboFormCopy.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { ReservationExtraOptionProps } from "../models/ReservationExtraOptionProps.interface";
import {
  RESERVATION_EXTRAS_INVENTORY_CLASS,
  RESERVATION_EXTRAS_OPTION_CONTENT_CLASS,
  RESERVATION_EXTRAS_PRICES_CLASS,
  resolveReservationExtrasOptionClassName,
} from "../styles/ReservationExtras.styles";
import { formatCustomComboAmount } from "../utils/formatCustomComboAmount";
import { shouldToggleReservationExtraCard } from "../utils/shouldToggleReservationExtraCard";

const ReservationExtraPrices = ({
  priceCrc,
  priceUsd,
}: ReservationExtraOptionProps): React.JSX.Element => (
  <div className={RESERVATION_EXTRAS_PRICES_CLASS}>
    <InlineText>
      {CUSTOM_COMBO_FORM_CURRENCY.CRC}:{" "}
      {formatCustomComboAmount(
        priceCrc,
        CUSTOM_COMBO_FORM_CURRENCY.CRC
      )}
    </InlineText>
    <InlineText>
      {CUSTOM_COMBO_FORM_CURRENCY.USD}:{" "}
      {formatCustomComboAmount(
        priceUsd,
        CUSTOM_COMBO_FORM_CURRENCY.USD
      )}
    </InlineText>
  </div>
);

const ReservationExtraOption = (
  props: ReservationExtraOptionProps
): React.JSX.Element => {
  const {
    extraId,
    isSelected,
    name,
    occupiesInventory,
    onToggle,
  } = props;
  return (
    <div
      aria-label={name}
      className={resolveReservationExtrasOptionClassName(
        isSelected
      )}
      onClick={(event) =>
        shouldToggleReservationExtraCard(event.target) &&
        onToggle(extraId)
      }
      role={ARIA_ROLE.GROUP}
    >
      <FormField
        checked={isSelected}
        id={extraId}
        label={name}
        name={RESERVATION_FORM_FIELD.EXTRA_IDS}
        onChange={(_event) => onToggle(extraId)}
        type={INPUT_TYPES.CHECKBOX}
        value={name}
      />
      <div
        className={RESERVATION_EXTRAS_OPTION_CONTENT_CLASS}
      >
        <ReservationExtraPrices {...props} />
        {occupiesInventory ? (
          <Text
            className={RESERVATION_EXTRAS_INVENTORY_CLASS}
          >
            {RESERVATION_FORM_UI_COPY.EXTRA_INVENTORY_NOTE}
          </Text>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationExtraOption;
