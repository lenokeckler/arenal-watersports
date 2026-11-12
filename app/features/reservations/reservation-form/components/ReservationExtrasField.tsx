import Button from "@/app/components/button/Button";
import Section from "@/app/components/section/Section";
import SectionTitle from "@/app/components/section-title/SectionTitle";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_EXTRA } from "../constants/ReservationExtra.constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationExtrasComponentProps } from "../models/ReservationExtrasComponentProps.interface";
import {
  RESERVATION_EXTRAS_CARD_CLASS,
  RESERVATION_EXTRAS_ERROR_CLASS,
  RESERVATION_EXTRAS_FEEDBACK_CLASS,
  RESERVATION_EXTRAS_OPTIONS_CLASS,
  RESERVATION_EXTRAS_RETRY_CLASS,
} from "../styles/ReservationExtras.styles";
import ReservationExtraOption from "./ReservationExtraOption";

const ReservationExtrasError = ({
  viewModel,
}: ReservationExtrasComponentProps): React.JSX.Element => (
  <div
    className={RESERVATION_EXTRAS_ERROR_CLASS}
    role={ARIA_ROLE.ALERT}
  >
    <Text>{RESERVATION_FORM_UI_COPY.EXTRAS_ERROR}</Text>
    <Button
      className={RESERVATION_EXTRAS_RETRY_CLASS}
      disabled={viewModel.extras.isLoading}
      onClick={viewModel.extras.retry}
      type="button"
      variant={BUTTON.SECONDARY}
    >
      {RESERVATION_FORM_UI_COPY.EXTRAS_RETRY}
    </Button>
  </div>
);

const ReservationExtrasStatus = ({
  viewModel,
}: ReservationExtrasComponentProps): NullableRef<React.JSX.Element> => {
  const { extras } = viewModel;
  if (extras.isLoading) {
    return (
      <Text
        className={RESERVATION_EXTRAS_FEEDBACK_CLASS}
        role={ARIA_ROLE.STATUS}
      >
        {RESERVATION_FORM_UI_COPY.EXTRAS_LOADING}
      </Text>
    );
  }
  if (extras.error) {
    return <ReservationExtrasError viewModel={viewModel} />;
  }
  if (extras.options.length === 0) {
    return (
      <Text className={RESERVATION_EXTRAS_FEEDBACK_CLASS}>
        {RESERVATION_FORM_UI_COPY.EXTRAS_EMPTY}
      </Text>
    );
  }
  return null;
};

const ReservationExtrasOptions = ({
  viewModel,
}: ReservationExtrasComponentProps): NullableRef<React.JSX.Element> => {
  const { extras, values } = viewModel;
  if (
    extras.isLoading ||
    extras.error ||
    extras.options.length === 0
  ) {
    return null;
  }
  const selectedIds = values.extraIds ?? [];
  return (
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
  );
};

const ReservationExtrasField = ({
  viewModel,
}: ReservationExtrasComponentProps): React.JSX.Element => (
  <Section
    ariaLabel={RESERVATION_EXTRA.SECTION_TITLE_ID}
    className={RESERVATION_EXTRAS_CARD_CLASS}
  >
    <div id={RESERVATION_EXTRA.SECTION_TITLE_ID}>
      <SectionTitle
        text={RESERVATION_FORM_UI_COPY.EXTRAS_TITLE}
      />
    </div>
    <Text>
      {RESERVATION_FORM_UI_COPY.EXTRAS_DESCRIPTION}
    </Text>
    <ReservationExtrasStatus viewModel={viewModel} />
    <ReservationExtrasOptions viewModel={viewModel} />
  </Section>
);

export default ReservationExtrasField;
