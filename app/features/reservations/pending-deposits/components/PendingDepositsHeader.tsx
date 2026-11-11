import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";
import {
  PENDING_DEPOSITS_DESCRIPTION_CLASS,
  PENDING_DEPOSITS_HEADER_CLASS,
  PENDING_DEPOSITS_TITLE_CLASS,
} from "../styles/PendingDeposits.styles";

const PendingDepositsHeader = (): React.JSX.Element => (
  <header className={PENDING_DEPOSITS_HEADER_CLASS}>
    <Title
      variant={TitleVariant.PRIMARY}
      text={PENDING_DEPOSITS_COPY.PAGE_TITLE}
      className={PENDING_DEPOSITS_TITLE_CLASS}
    />
    <Text className={PENDING_DEPOSITS_DESCRIPTION_CLASS}>
      {PENDING_DEPOSITS_COPY.PAGE_DESCRIPTION}
    </Text>
  </header>
);

export default PendingDepositsHeader;
