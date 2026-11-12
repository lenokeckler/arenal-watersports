import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { DAILY_INCOME_SKELETON } from "../constants/DailyIncome.constants";
import { DAILY_INCOME_COPY } from "../constants/DailyIncomeCopy.constants";
import {
  DAILY_INCOME_PAGE_CLASS,
  DAILY_INCOME_SECTIONS_CLASS,
} from "../styles/DailyIncome.styles";
import { DAILY_INCOME_SCREEN_READER_CLASS } from "../styles/DailyIncomeState.styles";
import DailyIncomeHeader from "./DailyIncomeHeader";
import DailyIncomeSkeletonCard from "./DailyIncomeSkeletonCard";

const SKELETON_CARDS = Array.from(
  { length: DAILY_INCOME_SKELETON.CARD_COUNT },
  (_, index) => index
);

const DailyIncomeLoading = (): React.JSX.Element => (
  <main
    className={DAILY_INCOME_PAGE_CLASS}
    aria-busy
  >
    <DailyIncomeHeader />
    <Text
      role={ARIA_ROLE.STATUS}
      className={DAILY_INCOME_SCREEN_READER_CLASS}
    >
      {DAILY_INCOME_COPY.LOADING_ANNOUNCEMENT}
    </Text>
    <div className={DAILY_INCOME_SECTIONS_CLASS}>
      {SKELETON_CARDS.map((card) => (
        <DailyIncomeSkeletonCard key={card} />
      ))}
    </div>
  </main>
);

export default DailyIncomeLoading;
