import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { RESERVATION_DETAIL_COPY as copy } from "./constants/ReservationDetailCopy.constants";
import {
  RESERVATION_DETAIL_FALLBACK_CLASS,
  RESERVATION_DETAIL_FALLBACK_COPY_CLASS,
  RESERVATION_DETAIL_FALLBACK_TITLE_CLASS,
  RESERVATION_DETAIL_PAGE_CLASS,
} from "./styles/ReservationDetail.styles";

const ReservationDetailNotFound = (): React.JSX.Element => (
  <main className={RESERVATION_DETAIL_PAGE_CLASS}>
    <div className={RESERVATION_DETAIL_FALLBACK_CLASS}>
      <Title
        variant={TitleVariant.PRIMARY}
        text={copy.MISSING_RESERVATION}
        className={RESERVATION_DETAIL_FALLBACK_TITLE_CLASS}
      />
      <Text
        className={RESERVATION_DETAIL_FALLBACK_COPY_CLASS}
      >
        {copy.MISSING_RESERVATION_DESCRIPTION}
      </Text>
    </div>
  </main>
);

export default ReservationDetailNotFound;
