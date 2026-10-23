import Button from "@/app/components/button/Button";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import { RESERVATION_EXTRA } from "../constants/ReservationExtra.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationExtrasComponentProps } from "../models/ReservationExtrasComponentProps.interface";
import {
  RESERVATION_EXTRAS_CARD_CLASS,
  RESERVATION_EXTRAS_ERROR_CLASS,
  RESERVATION_EXTRAS_FEEDBACK_CLASS,
  RESERVATION_EXTRAS_LEGEND_CLASS,
  RESERVATION_EXTRAS_OPTIONS_CLASS,
  RESERVATION_EXTRAS_RETRY_CLASS,
} from "../styles/ReservationExtras.styles";
import ReservationExtraOption from "./ReservationExtraOption";

const ReservationExtrasField = ({
  viewModel,
}: ReservationExtrasComponentProps): React.JSX.Element => {
  const { extras, values } = viewModel;
  const selectedIds = values.extraIds ?? [];

  return (
    <fieldset className={RESERVATION_EXTRAS_CARD_CLASS}>
      <legend className={RESERVATION_EXTRAS_LEGEND_CLASS}>
        {RESERVATION_FORM_UI_COPY.EXTRAS_TITLE}
      </legend>
      <Text>
        {RESERVATION_FORM_UI_COPY.EXTRAS_DESCRIPTION}
      </Text>
      {extras.isLoading ? (
        <Text
          className={RESERVATION_EXTRAS_FEEDBACK_CLASS}
          role={ARIA_ROLE.STATUS}
        >
          {RESERVATION_FORM_UI_COPY.EXTRAS_LOADING}
        </Text>
      ) : null}
      {extras.error ? (
        <div
          className={RESERVATION_EXTRAS_ERROR_CLASS}
          role={ARIA_ROLE.ALERT}
        >
          <Text>
            {RESERVATION_FORM_UI_COPY.EXTRAS_ERROR}
          </Text>
          <Button
            className={RESERVATION_EXTRAS_RETRY_CLASS}
            disabled={extras.isLoading}
            onClick={extras.retry}
            type="button"
            variant={BUTTON.SECONDARY}
          >
            {RESERVATION_FORM_UI_COPY.EXTRAS_RETRY}
          </Button>
        </div>
      ) : null}
      {!extras.isLoading &&
      !extras.error &&
      extras.options.length === 0 ? (
        <Text className={RESERVATION_EXTRAS_FEEDBACK_CLASS}>
          {RESERVATION_FORM_UI_COPY.EXTRAS_EMPTY}
        </Text>
      ) : null}
      {!extras.isLoading &&
      !extras.error &&
      extras.options.length > 0 ? (
        <div className={RESERVATION_EXTRAS_OPTIONS_CLASS}>
          {extras.options.map((extra) => (
            <ReservationExtraOption
              extraId={extra.id}
              isSelected={selectedIds.includes(extra.id)}
              key={extra.id}
              name={extra.name}
              occupiesInventory={
                extra.occupiesCategoryId !== null &&
                (extra.occupiesQuantity ??
                  RESERVATION_EXTRA.NO_OCCUPANCY) >
                  RESERVATION_EXTRA.NO_OCCUPANCY
              }
              onToggle={viewModel.handleExtraToggle}
              priceCrc={extra.priceCrc}
              priceUsd={extra.priceUsd}
            />
          ))}
        </div>
      ) : null}
    </fieldset>
  );
};

export default ReservationExtrasField;
