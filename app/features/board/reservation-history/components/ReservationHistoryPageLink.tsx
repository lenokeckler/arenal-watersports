import Link from "@/app/components/link/Link";
import { Text } from "@/app/components/text/Text";
import type { ReservationHistoryPageLinkProps } from "../models/ReservationHistoryPageLinkProps.interface";
import {
  RESERVATION_HISTORY_DISABLED_PAGE_LINK_CLASS,
  RESERVATION_HISTORY_PAGE_LINK_CLASS,
} from "../styles/ReservationHistoryPagination.styles";

const ReservationHistoryPageLink = ({
  href,
  isEnabled,
  label,
}: ReservationHistoryPageLinkProps): React.JSX.Element =>
  isEnabled ? (
    <Link
      href={href}
      className={RESERVATION_HISTORY_PAGE_LINK_CLASS}
    >
      {label}
    </Link>
  ) : (
    <Text
      aria-disabled
      className={
        RESERVATION_HISTORY_DISABLED_PAGE_LINK_CLASS
      }
    >
      {label}
    </Text>
  );

export default ReservationHistoryPageLink;
