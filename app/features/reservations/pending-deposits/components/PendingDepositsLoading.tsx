import { Text, UnorderedList } from "@/app/components";
import { ARIA_ROLE, UNORDERED_LIST } from "@/app/constants";
import { PENDING_DEPOSITS_SKELETON_ROW_COUNT } from "../constants/PendingDeposits.constants";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";
import { PENDING_DEPOSITS_PAGE_CLASS } from "../styles/PendingDeposits.styles";
import { DEPOSIT_SCREEN_READER_CLASS } from "../styles/PendingDepositsLoading.styles";
import PendingDepositSkeletonRow from "./PendingDepositSkeletonRow";
import PendingDepositsHeader from "./PendingDepositsHeader";

const SKELETON_ITEMS = Array.from(
  { length: PENDING_DEPOSITS_SKELETON_ROW_COUNT },
  () => ({ text: <PendingDepositSkeletonRow /> })
);

const PendingDepositsLoading = (): React.JSX.Element => (
  <main
    className={PENDING_DEPOSITS_PAGE_CLASS}
    aria-busy
  >
    <PendingDepositsHeader />
    <Text
      role={ARIA_ROLE.STATUS}
      className={DEPOSIT_SCREEN_READER_CLASS}
    >
      {PENDING_DEPOSITS_COPY.LOADING_ANNOUNCEMENT}
    </Text>
    <UnorderedList
      variant={UNORDERED_LIST.VARIANTS.PLAIN}
      items={SKELETON_ITEMS}
    />
  </main>
);

export default PendingDepositsLoading;
