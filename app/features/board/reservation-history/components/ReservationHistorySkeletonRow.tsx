import {
  RESERVATION_HISTORY_SKELETON_CUSTOMER_CLASS,
  RESERVATION_HISTORY_SKELETON_DATE_CLASS,
  RESERVATION_HISTORY_SKELETON_ITEM_CLASS,
  RESERVATION_HISTORY_SKELETON_LINE_CLASS,
} from "../styles/ReservationHistoryState.styles";

const ReservationHistorySkeletonRow =
  (): React.JSX.Element => (
    <div
      className={RESERVATION_HISTORY_SKELETON_ITEM_CLASS}
    >
      <div
        className={RESERVATION_HISTORY_SKELETON_DATE_CLASS}
      />
      <div
        className={
          RESERVATION_HISTORY_SKELETON_CUSTOMER_CLASS
        }
      />
      <div
        className={RESERVATION_HISTORY_SKELETON_LINE_CLASS}
      />
    </div>
  );

export default ReservationHistorySkeletonRow;
