import Link from "@/app/components/link/Link";
import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  PATHS,
  STRING,
} from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_FIELD_ID } from "../constants/StockCountFieldId.constants";
import type { StockCountHeaderProps } from "../models/StockCountHeaderProps.interface";
import {
  STOCK_COUNT_HEADER_ACTIONS_CLASS,
  STOCK_COUNT_HEADER_CLASS,
} from "../styles/StockCount.styles";
import { STOCK_COUNT_LINK_CLASS } from "../styles/StockCountLink.styles";

const StockCountHeader = ({
  categoryName,
}: StockCountHeaderProps): React.JSX.Element => (
  <div className={STOCK_COUNT_HEADER_CLASS}>
    <ScreenHeading
      title={[
        STOCK_COUNT_COPY.TITLE_PREFIX,
        categoryName,
      ].join(STRING.SPACE)}
      titleId={ADMINISTRATION_SCREEN_TITLE_ID}
      hasLogo={false}
      instruction={STOCK_COUNT_COPY.FORM_HINT}
      instructionId={STOCK_COUNT_FIELD_ID.HINT}
    />
    <div className={STOCK_COUNT_HEADER_ACTIONS_CLASS}>
      <Link
        href={PATHS.ADMINISTRATION.CATEGORIES}
        className={STOCK_COUNT_LINK_CLASS}
      >
        {STOCK_COUNT_COPY.BACK_TO_CATEGORIES_LINK}
      </Link>
    </div>
  </div>
);

export default StockCountHeader;
