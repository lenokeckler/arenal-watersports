import { Link, Title } from "@/app/components";
import { PATHS, TitleVariant } from "@/app/constants";
import { DEPOSIT_RESOLUTION_FIELD_ID } from "../constants/DepositResolutionUi.constants";
import { DEPOSIT_RESOLUTION_UI_COPY as COPY } from "../constants/DepositResolutionUiCopy.constants";
import type { DepositResolutionLayoutProps } from "../models/DepositResolutionLayoutProps.interface";
import {
  DEPOSIT_RESOLUTION_BACK_CLASS,
  DEPOSIT_RESOLUTION_CARD_CLASS,
  DEPOSIT_RESOLUTION_HEADER_CLASS,
  DEPOSIT_RESOLUTION_MAIN_CLASS,
  DEPOSIT_RESOLUTION_PAGE_CLASS,
  DEPOSIT_RESOLUTION_TITLE_CLASS,
} from "../styles/DepositResolution.styles";

const DepositResolutionLayout = ({
  children,
}: DepositResolutionLayoutProps): React.JSX.Element => (
  <main
    aria-labelledby={DEPOSIT_RESOLUTION_FIELD_ID.HEADING}
    className={DEPOSIT_RESOLUTION_MAIN_CLASS}
  >
    <div className={DEPOSIT_RESOLUTION_PAGE_CLASS}>
      <header className={DEPOSIT_RESOLUTION_HEADER_CLASS}>
        <Link
          href={PATHS.RESERVATIONS.DEPOSITS}
          className={DEPOSIT_RESOLUTION_BACK_CLASS}
        >
          {COPY.BACK_TO_PENDING}
        </Link>
        <Title
          id={DEPOSIT_RESOLUTION_FIELD_ID.HEADING}
          variant={TitleVariant.PRIMARY}
          text={COPY.TITLE}
          className={DEPOSIT_RESOLUTION_TITLE_CLASS}
        />
      </header>
      <div className={DEPOSIT_RESOLUTION_CARD_CLASS}>
        {children}
      </div>
    </div>
  </main>
);

export default DepositResolutionLayout;
