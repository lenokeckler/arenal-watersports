import { Text, UnorderedList } from "@/app/components";
import {
  ARIA_ROLE,
  PAGINATION,
  UNORDERED_LIST,
} from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import {
  RESERVATION_HISTORY_LIST_CLASS,
  RESERVATION_HISTORY_PAGE_CLASS,
} from "../styles/ReservationHistory.styles";
import { RESERVATION_HISTORY_SCREEN_READER_CLASS } from "../styles/ReservationHistoryState.styles";
import ReservationHistoryHeader from "./ReservationHistoryHeader";
import ReservationHistorySkeletonRow from "./ReservationHistorySkeletonRow";

const SKELETON_ITEMS = Array.from(
  { length: PAGINATION.DEFAULT_PAGE_SIZE },
  () => ({ text: <ReservationHistorySkeletonRow /> })
);

const ReservationHistoryLoading = (): React.JSX.Element => (
  <main
    className={RESERVATION_HISTORY_PAGE_CLASS}
    aria-busy
  >
    <ReservationHistoryHeader />
    <Text
      role={ARIA_ROLE.STATUS}
      className={RESERVATION_HISTORY_SCREEN_READER_CLASS}
    >
      {RESERVATION_HISTORY_COPY.LOADING_ANNOUNCEMENT}
    </Text>
    <UnorderedList
      variant={UNORDERED_LIST.VARIANTS.PLAIN}
      className={RESERVATION_HISTORY_LIST_CLASS}
      items={SKELETON_ITEMS}
    />
  </main>
);

export default ReservationHistoryLoading;
