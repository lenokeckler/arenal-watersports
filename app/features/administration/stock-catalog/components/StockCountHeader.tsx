import ScreenHeading from "@/app/components/screen-header/ScreenHeading";
import {
  ADMINISTRATION_SCREEN_TITLE_ID,
  STRING,
} from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_FIELD_ID } from "../constants/StockCountFieldId.constants";
import type { StockCountHeaderProps } from "../models/StockCountHeaderProps.interface";
import { STOCK_COUNT_HEADER_CLASS } from "../styles/StockCount.styles";

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
  </div>
);

export default StockCountHeader;
