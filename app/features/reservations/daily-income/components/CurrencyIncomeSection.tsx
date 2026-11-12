import { Section, Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import type { CurrencyIncomeProps } from "../models/CurrencyIncomeProps.interface";
import {
  CURRENCY_INCOME_CODE_CLASS,
  CURRENCY_INCOME_HEADER_CLASS,
  CURRENCY_INCOME_NAME_CLASS,
  CURRENCY_INCOME_SECTION_CLASS,
} from "../styles/DailyIncomeCurrency.styles";
import { buildCurrencyIncomeIds } from "../utils/buildCurrencyIncomeIds";
import CurrencyIncomeFigure from "./CurrencyIncomeFigure";
import CurrencyNoMovement from "./CurrencyNoMovement";

const CurrencyIncomeSection = ({
  income,
}: CurrencyIncomeProps): React.JSX.Element => {
  const titleId = buildCurrencyIncomeIds(
    income.currency
  ).title;

  return (
    <Section
      ariaLabel={titleId}
      className={CURRENCY_INCOME_SECTION_CLASS}
    >
      <div className={CURRENCY_INCOME_HEADER_CLASS}>
        <Title
          variant={TitleVariant.SECONDARY}
          id={titleId}
          text={CURRENCY_NAME_COPY[income.currency]}
          className={CURRENCY_INCOME_NAME_CLASS}
        />
        <Text className={CURRENCY_INCOME_CODE_CLASS}>
          {income.currency}
        </Text>
      </div>
      {income.byPaymentMethod.length === 0 ? (
        <CurrencyNoMovement currency={income.currency} />
      ) : (
        <CurrencyIncomeFigure income={income} />
      )}
    </Section>
  );
};

export default CurrencyIncomeSection;
