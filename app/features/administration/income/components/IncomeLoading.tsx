import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";
import { INCOME_SKELETON } from "../constants/Income.constants";
import { INCOME_COPY } from "../constants/IncomeCopy.constants";
import {
  INCOME_PAGE_CLASS,
  INCOME_SECTIONS_CLASS,
} from "../styles/Income.styles";
import IncomeHeader from "./IncomeHeader";
import IncomeSkeletonCard from "./IncomeSkeletonCard";

const SKELETON_CARDS = Array.from(
  { length: INCOME_SKELETON.CARD_COUNT },
  (_, index) => index
);

const IncomeLoading = (): React.JSX.Element => (
  <main
    className={INCOME_PAGE_CLASS}
    aria-busy
  >
    <IncomeHeader />
    <Text
      role={ARIA_ROLE.STATUS}
      className={SCREEN_READER_ONLY_CLASS}
    >
      {INCOME_COPY.LOADING_ANNOUNCEMENT}
    </Text>
    <div className={INCOME_SECTIONS_CLASS}>
      {SKELETON_CARDS.map((card) => (
        <IncomeSkeletonCard key={card} />
      ))}
    </div>
  </main>
);

export default IncomeLoading;
