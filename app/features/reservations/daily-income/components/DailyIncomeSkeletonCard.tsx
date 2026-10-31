import { DAILY_INCOME_SKELETON } from "../constants/DailyIncome.constants";
import {
  DAILY_INCOME_SKELETON_AMOUNT_CLASS,
  DAILY_INCOME_SKELETON_CARD_CLASS,
  DAILY_INCOME_SKELETON_METHOD_CLASS,
  DAILY_INCOME_SKELETON_NAME_CLASS,
  DAILY_INCOME_SKELETON_TRACK_CLASS,
} from "../styles/DailyIncomeState.styles";

const SKELETON_ROWS = Array.from(
  { length: DAILY_INCOME_SKELETON.ROW_COUNT },
  (_, index) => index
);

const DailyIncomeSkeletonCard = (): React.JSX.Element => (
  <div className={DAILY_INCOME_SKELETON_CARD_CLASS}>
    <div className={DAILY_INCOME_SKELETON_NAME_CLASS} />
    <div className={DAILY_INCOME_SKELETON_AMOUNT_CLASS} />
    {SKELETON_ROWS.map((row) => (
      <div key={row}>
        <div
          className={DAILY_INCOME_SKELETON_METHOD_CLASS}
        />
        <div
          className={DAILY_INCOME_SKELETON_TRACK_CLASS}
        />
      </div>
    ))}
  </div>
);

export default DailyIncomeSkeletonCard;
