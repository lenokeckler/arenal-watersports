import Button from "@/app/components/button/Button";
import SectionTitle from "@/app/components/section-title/SectionTitle";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { CustomComboUnitExtrasProps } from "../models/CustomComboUnitExtrasProps.interface";
import { useReservationExtraOptions } from "../hooks/useReservationExtraOptions";
import {
  RESERVATION_EXTRAS_ERROR_CLASS,
  RESERVATION_EXTRAS_FEEDBACK_CLASS,
  RESERVATION_EXTRAS_OPTIONS_CLASS,
  RESERVATION_EXTRAS_RETRY_CLASS,
} from "../styles/ReservationExtras.styles";
import { CUSTOM_COMBO_UNIT_EXTRAS_CLASS } from "../styles/CustomComboUnitExtras.styles";
import ReservationExtraOption from "./ReservationExtraOption";

const CustomComboUnitExtras = ({
  extraIds,
  onToggle,
  unitId,
}: CustomComboUnitExtrasProps): React.JSX.Element => {
  const extras = useReservationExtraOptions(
    unitId,
    RESERVATION_TYPE.RENTAL
  );
  const selectedExtraIds =
    extras.options.length > 0 ? extraIds : [];

  return (
    <section className={CUSTOM_COMBO_UNIT_EXTRAS_CLASS}>
      <SectionTitle
        text={RESERVATION_FORM_UI_COPY.EXTRAS_TITLE}
      />
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
              isSelected={selectedExtraIds.includes(
                extra.id
              )}
              key={extra.id}
              name={extra.name}
              occupiesInventory={
                extra.occupiesCategoryId !== null
              }
              onToggle={() => onToggle(unitId, extra.id)}
              priceCrc={extra.priceCrc}
              priceUsd={extra.priceUsd}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default CustomComboUnitExtras;
