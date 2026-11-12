import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { INCOME_COPY } from "../constants/IncomeCopy.constants";
import type { IncomeHeaderProps } from "../models/IncomeHeaderProps.interface";
import {
  INCOME_DATE_CLASS,
  INCOME_DESCRIPTION_CLASS,
  INCOME_HEADER_CLASS,
  INCOME_TITLE_CLASS,
} from "../styles/Income.styles";
import { formatIncomeDate } from "../utils/formatIncomeDate";

const IncomeHeader = ({
  date,
}: IncomeHeaderProps): React.JSX.Element => (
  <header className={INCOME_HEADER_CLASS}>
    <Title
      variant={TitleVariant.PRIMARY}
      text={INCOME_COPY.PAGE_TITLE}
      className={INCOME_TITLE_CLASS}
    />
    {date && (
      <Text className={INCOME_DATE_CLASS}>
        <time dateTime={date}>
          {formatIncomeDate(date)}
        </time>
      </Text>
    )}
    <Text className={INCOME_DESCRIPTION_CLASS}>
      {INCOME_COPY.PAGE_DESCRIPTION}
    </Text>
  </header>
);

export default IncomeHeader;
