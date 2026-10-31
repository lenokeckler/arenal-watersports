import {
  DEPOSIT_SKELETON_AMOUNT_CLASS,
  DEPOSIT_SKELETON_CODE_CLASS,
  DEPOSIT_SKELETON_CUSTOMER_CLASS,
  DEPOSIT_SKELETON_DETAILS_CLASS,
  DEPOSIT_SKELETON_ITEM_CLASS,
} from "../styles/PendingDepositsState.styles";

const PendingDepositSkeletonRow = (): React.JSX.Element => (
  <div className={DEPOSIT_SKELETON_ITEM_CLASS}>
    <div className={DEPOSIT_SKELETON_DETAILS_CLASS}>
      <div className={DEPOSIT_SKELETON_CUSTOMER_CLASS} />
      <div className={DEPOSIT_SKELETON_CODE_CLASS} />
    </div>
    <div className={DEPOSIT_SKELETON_AMOUNT_CLASS} />
  </div>
);

export default PendingDepositSkeletonRow;
