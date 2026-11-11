import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import type { IncomeDisplayProps } from "../models/IncomeDisplayProps.interface";
import {
  INCOME_CURRENCY_CLASS,
  INCOME_CURRENCY_CODE_CLASS,
  INCOME_CURRENCY_HEADER_CLASS,
  INCOME_CURRENCY_NAME_CLASS,
} from "../styles/IncomeCurrency.styles";
import { buildIncomeTitleId } from "../utils/buildIncomeTitleId";
import IncomeFigures from "./IncomeFigures";
import IncomeNoMovement from "./IncomeNoMovement";

const IncomeCurrencySection = ({
  display,
}: IncomeDisplayProps): React.JSX.Element => {
  const titleId = buildIncomeTitleId(display.currency);

  return (
    <Section
      ariaLabel={titleId}
      className={INCOME_CURRENCY_CLASS}
    >
      <div className={INCOME_CURRENCY_HEADER_CLASS}>
        <Title
          variant={TitleVariant.SECONDARY}
          id={titleId}
          text={CURRENCY_NAME_COPY[display.currency]}
          className={INCOME_CURRENCY_NAME_CLASS}
        />
        <Text className={INCOME_CURRENCY_CODE_CLASS}>
          {display.currency}
        </Text>
      </div>
      {display.hasMovement ? (
        <IncomeFigures display={display} />
      ) : (
        <IncomeNoMovement currency={display.currency} />
      )}
    </Section>
  );
};

export default IncomeCurrencySection;
