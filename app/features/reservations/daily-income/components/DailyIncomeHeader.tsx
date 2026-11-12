import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { DAILY_INCOME_COPY } from "../constants/DailyIncomeCopy.constants";
import type { DailyIncomeHeaderProps } from "../models/DailyIncomeHeaderProps.interface";
import {
  DAILY_INCOME_DATE_CLASS,
  DAILY_INCOME_DESCRIPTION_CLASS,
  DAILY_INCOME_HEADER_CLASS,
  DAILY_INCOME_TITLE_CLASS,
} from "../styles/DailyIncome.styles";
import { formatIncomeDate } from "../utils/formatIncomeDate";

const DailyIncomeHeader = ({
  date,
}: DailyIncomeHeaderProps): React.JSX.Element => (
  <header className={DAILY_INCOME_HEADER_CLASS}>
    <Title
      variant={TitleVariant.PRIMARY}
      text={DAILY_INCOME_COPY.PAGE_TITLE}
      className={DAILY_INCOME_TITLE_CLASS}
    />
    {date && (
      <Text className={DAILY_INCOME_DATE_CLASS}>
        <time dateTime={date}>
          {formatIncomeDate(date)}
        </time>
      </Text>
    )}
    <Text className={DAILY_INCOME_DESCRIPTION_CLASS}>
      {DAILY_INCOME_COPY.PAGE_DESCRIPTION}
    </Text>
  </header>
);

export default DailyIncomeHeader;
