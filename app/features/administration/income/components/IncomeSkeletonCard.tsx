import { INCOME_SKELETON } from "../constants/Income.constants";
import { INCOME_NET_BLOCK_CLASS } from "../styles/IncomeCurrency.styles";
import {
  INCOME_SKELETON_CARD_CLASS,
  INCOME_SKELETON_FIGURE_CLASS,
  INCOME_SKELETON_LABEL_CLASS,
  INCOME_SKELETON_NAME_CLASS,
  INCOME_SKELETON_NET_AMOUNT_CLASS,
  INCOME_SKELETON_NET_LABEL_CLASS,
  INCOME_SKELETON_ROW_CLASS,
} from "../styles/IncomeState.styles";

const SKELETON_ROWS = Array.from(
  { length: INCOME_SKELETON.ROW_COUNT },
  (_, index) => index
);

const IncomeSkeletonCard = (): React.JSX.Element => (
  <div className={INCOME_SKELETON_CARD_CLASS}>
    <div className={INCOME_SKELETON_NAME_CLASS} />
    {SKELETON_ROWS.map((row) => (
      <div
        key={row}
        className={INCOME_SKELETON_ROW_CLASS}
      >
        <div className={INCOME_SKELETON_LABEL_CLASS} />
        <div className={INCOME_SKELETON_FIGURE_CLASS} />
      </div>
    ))}
    <div className={INCOME_NET_BLOCK_CLASS}>
      <div className={INCOME_SKELETON_NET_LABEL_CLASS} />
      <div className={INCOME_SKELETON_NET_AMOUNT_CLASS} />
    </div>
  </div>
);

export default IncomeSkeletonCard;
